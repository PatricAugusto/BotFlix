import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/auth';
import api from '../api/api';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(5)};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #A968FF;
  }
`;

const Home = () => {
  const { user, logout } = useAuth();
  const [moviesData, setMoviesData] = useState(null);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [errorMovies, setErrorMovies] = useState(null);

  const fetchProtectedData = async () => {
    setLoadingMovies(true);
    setErrorMovies(null);

    try {
      const response = await api.get('/Movie'); 
      setMoviesData(response.data);
    } catch (error) {
      console.error('Erro ao buscar filmes (Rota Protegida):', error.response || error);
      setErrorMovies(error.response?.status === 401 
        ? "Não autorizado. Seu token pode ter expirado. Faça login novamente." 
        : "Erro ao carregar dados protegidos.");
    } finally {
      setLoadingMovies(false);
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, []);

  return (
    <HomeContainer>
      <h2>Bem-vindo ao Botflix, **{user?.username || 'Usuário'}**!</h2>
      <p>Seu e-mail: {user?.email}</p>

      <Button onClick={logout}>
        Sair (Logout)
      </Button>

      <h3>Teste de Rota Protegida C# (`/api/Movie`)</h3>
      
      {loadingMovies && <p>Carregando sugestões...</p>}
      
      {errorMovies && <p style={{ color: 'red' }}>Erro: {errorMovies}</p>}
      
      {moviesData && (
        <div style={{ textAlign: 'left', width: '100%', borderTop: '1px solid #333', paddingTop: '16px' }}>
          <h4>Resposta da API Protegida:</h4>
          {moviesData.Movies.map(movie => (
            <div key={movie.Id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#222', borderRadius: '4px' }}>
                <strong>{movie.Title}</strong> ({movie.Genre})<br/>
                <small>Razão: {movie.SuggestionReason}</small>
            </div>
          ))}
          <p style={{ marginTop: '10px', fontSize: '0.8em', color: '#888' }}>* Usuário identificado pelo Backend: {moviesData.UserId} ({moviesData.UserEmail})</p>
        </div>
      )}
      
    </HomeContainer>
  );
};

export default Home;