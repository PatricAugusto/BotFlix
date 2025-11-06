import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthCard, Title, Form, Input, Button, SwitchText } from '../components/AuthStyles';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/auth/login', formData);

            const { token, user } = response.data;

            localStorage.setItem('botflix_token', token);

            localStorage.setItem('botflix_user', JSON.stringify(user));

            console.log("Login bem-sucedido! Token armazenado.");
            alert(`Bem-vindo, ${user.username}!`);

            navigate('/'); 
            
        } catch (error) {
            console.error("Erro no login:", error.response || error);
            
            const errorMessage = error.response?.data?.message || "Erro ao tentar fazer login. Credenciais inválidas.";
            alert(`Falha no Login: ${errorMessage}`);
        }
    };

    return (
        <AuthCard>
            <Title>🎬 Login Botflix</Title>
            <Form onSubmit={handleSubmit}>
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