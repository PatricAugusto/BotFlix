import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api/api';

const SuggestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  gap: 15px;
  padding: 20px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surfaceDark};
`;

const InputArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  font-family: inherit;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00bfff; 
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const ResultCard = styled.div`
  padding: 15px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.highlight};
  color: ${({ theme }) => theme.colors.background};
  
  h4 {
    margin-top: 0;
    color: #ffd700; /* Ouro */
  }
`;

const MoodInput = () => {
  const [mood, setMood] = useState('');
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const response = await api.post('/Suggestion', { mood }); 
      
      setSuggestion(response.data);
      
    } catch (error) {
      console.error('Erro ao consultar o Gemini:', error.response || error);
      setError("Erro ao obter sugestão. Verifique sua chave Gemini e o Backend.");
      
      if (error.response && error.response.status === 401) {
        setError("Sessão expirada. Por favor, faça login novamente.");
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <SuggestionContainer>
      <h3>🤖 Sugestão de Filme Botflix (IA)</h3>
      <p>Descreva seu humor, o que você está sentindo ou o que gostaria de assistir:</p>
      
      <form onSubmit={handleSubmit}>
        <InputArea
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Ex: Estou me sentindo nostálgico e preciso de algo divertido..."
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !mood.trim()}>
          {loading ? 'Consultando IA...' : 'Sugira um Filme'}
        </Button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {suggestion && (
        <ResultCard>
          <h4>🎬 Filme Sugerido pela IA:</h4>
          <p>
            <strong>Título:</strong> {suggestion.title} <br/>
            <strong>Gênero:</strong> {suggestion.genre}
          </p>
          <p>
            * **Por que?** {suggestion.reason}
          </p>
        </ResultCard>
      )}

    </SuggestionContainer>
  );
};

export default MoodInput;