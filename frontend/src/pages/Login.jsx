import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthCard, Title, Form, Input, Button, SwitchText } from '../components/AuthStyles';

const Login = () => {
    const { login } = useAuth(); 
    const navigate = useNavigate(); 
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            await login(formData.email, formData.password); 
            
            console.log("Login bem-sucedido via Contexto!");
            navigate('/'); 
            
        } catch (err) {
            console.error("Erro no Login:", err);
            const errorMessage = err.response?.data?.message || "Credenciais inválidas ou erro de conexão.";
            setError(errorMessage); 
        }
    };

    return (
        <AuthCard>
            <Title>🎬 Login Botflix</Title>
            <Form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">
                    Entrar
                </Button>
            </Form>
            
            <SwitchText>
                Não tem conta? <Link to="/register">Crie uma agora!</Link>
            </SwitchText>
        </AuthCard>
    );
};

export default Login;