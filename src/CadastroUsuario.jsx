import { useState } from 'react';
import styles from './CadastroUsuario.module.css';

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastroUsuario = (e) => {
    e.preventDefault();

    const novoUsuario = {
      id: Date.now(),
      nome,
      sobrenome,
      cpf,
      telefone,
      email,
      senha,
    };

    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

    const jaExiste = usuariosSalvos.some(
      (u) => u.email === email || u.cpf === cpf
    );

    if (jaExiste) {
      setMensagem('Usuário já cadastrado com este e-mail ou CPF.');
      return;
    }

    usuariosSalvos.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));

    setMensagem('Usuário cadastrado com sucesso!');
    setNome('');
    setSobrenome('');
    setCpf('');
    setTelefone('');
    setEmail('');
    setSenha('');
  };

  return (
    <div className={styles.formContainer}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleCadastroUsuario}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
        <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CadastroUsuario;
