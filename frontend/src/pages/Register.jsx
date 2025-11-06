import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Dados de Cadastro:", formData);
        
        alert("Simulação de Cadastro concluída. Redirecionando para Login.");

        navigate('/login'); 
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