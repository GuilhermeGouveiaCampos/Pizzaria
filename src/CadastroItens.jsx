import { useState } from 'react';
import styles from './CadastroItens.module.css';

const CadastroItens = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastroItem = (e) => {
    e.preventDefault();

    const novoItem = {
      id: Date.now(),
      nome,
      descricao,
      preco,
      tamanho
    };

    const itensSalvos = JSON.parse(localStorage.getItem('itens')) || [];
    itensSalvos.push(novoItem);
    localStorage.setItem('itens', JSON.stringify(itensSalvos));

    setMensagem('Item cadastrado com sucesso!');
    setNome('');
    setDescricao('');
    setPreco('');
    setTamanho('');
  };

  return (
    <div className={styles.formContainer}>
      <h2>Cadastro de Itens</h2>
      <form onSubmit={handleCadastroItem}>
        <input type="text" placeholder="Nome do Item" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <input type="text" placeholder="Preço (R$)" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        <select value={tamanho} onChange={(e) => setTamanho(e.target.value)} required>
          <option value="">Selecione o tamanho</option>
          <option value="pequena">Pequena</option>
          <option value="media">Média</option>
          <option value="grande">Grande</option>
          <option value="gigante">Gigante</option>
          <option value="familia">Família</option>
        </select>
        <button type="submit">Cadastrar Item</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CadastroItens;
