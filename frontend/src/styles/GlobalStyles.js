import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  colors: {
    background: '#121212', 
    surface: '#1E1E1E',   
    primary: '#BB86FC',    
    secondary: '#03DAC6',  
    textPrimary: '#FFFFFF', 
    textSecondary: '#A9A9A9', 
    error: '#CF6679',       
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", 
    fontSize: '16px',
  },
  spacing: (value) => `${value * 8}px`, 
};

const GlobalStyles = createGlobalStyle`

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    line-height: 1.6;
    min-height: 100vh;
    transition: background 0.3s, color 0.3s;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyles;