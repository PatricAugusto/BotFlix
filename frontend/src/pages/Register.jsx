import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import api from '../api/api';
import { AuthCard, Title, Form, Input, Button, SwitchText } from '../components/AuthStyles';

const Register = () => {
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        
        try {
            const response = await api.post('/auth/register', formData); 

            console.log("Registro bem-sucedido:", response.data.message);
            alert("Cadastro realizado com sucesso! Faça login.");
            
            navigate('/login');
            
        } catch (error) {
            console.error("Erro no registro:", error.response || error);
            
            const errorMessage = error.response?.data?.message || "Erro ao tentar registrar. Tente novamente.";
            alert(`Falha no Registro: ${errorMessage}`);
        }
    };

    return (
        <AuthCard>
            <Title>🤖 Cadastre-se no Botflix</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="username"
                    placeholder="Nome de Usuário"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
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
                    placeholder="Senha (min 6 caracteres)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                />
                <Button type="submit">
                    Criar Conta
                </Button>
            </Form>
            
            <SwitchText>
                Já tem uma conta? <Link to="/login">Faça Login</Link>
            </SwitchText>
        </AuthCard>
    );
};

export default Register;