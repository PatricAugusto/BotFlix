import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import styled from 'styled-components';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

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
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage /> 
            </ProtectedRoute>
          } 
        />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppContainer>
  );
}

export default App;