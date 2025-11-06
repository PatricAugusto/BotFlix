import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = () => <h1>Login Page (a ser implementada)</h1>;
const RegisterPage = () => <h1>Register Page (a ser implementada)</h1>;
const HomePage = () => <h1>Botflix Home (a ser implementada)</h1>;
const NotFound = () => <h1>404 | Não Encontrado</h1>;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppContainer>
  );
}

export default App;