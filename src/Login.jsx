import { useState, useEffect } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Simulação: cria um usuário fixo no LocalStorage na primeira execução
  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.length === 0) {
      const usuarioPadrao = {
        id: 1,
        nome: "Administrador",
        sobrenome: "Pizzaria",
        cpf: "00000000000",
        telefone: "(64) 99999-9999",
        email: "admin@pizzaria.com",
        senha: "123456"
      };
      localStorage.setItem('usuarios', JSON.stringify([usuarioPadrao]));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuariosSalvos.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuario) {
      setMensagem('Login realizado com sucesso!');
      onLogin(true); // Simula navegação ou controle de login
    } else {
      setMensagem('Email ou senha inválidos.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default Login;
