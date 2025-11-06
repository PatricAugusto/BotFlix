import styled from 'styled-components';

export const AuthCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(4)}; 
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4); 
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(3)}; 
  font-weight: 700;
  letter-spacing: 1px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1.5)}; 
  border: 1px solid ${({ theme }) => theme.colors.surface};
  border-radius: 4px;
  background-color: #2c2c2c; 
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background}; 
  border: none;
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-top: ${({ theme }) => theme.spacing(1)};

  &:hover {
    background-color: #A968FF; 
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

export const SwitchText = styled.p`
    margin-top: ${({ theme }) => theme.spacing(2)};
    font-size: 0.9em;
    color: ${({ theme }) => theme.colors.textSecondary};
`;