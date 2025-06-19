import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RelatorioClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const clientesSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
    setClientes(clientesSalvos);
  }, []);

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Clientes', 14, 10);

    const tableColumn = ["ID", "Nome", "Sobrenome", "CPF", "Telefone", "Email"];
    const tableRows = clientes.map(cliente => [
      cliente.id,
      cliente.nome,
      cliente.sobrenome,
      cliente.cpf,
      cliente.telefone,
      cliente.email
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid'
    });

    doc.save("Relatorio_Clientes.pdf");
  };

  return (
    <div>
      <h2>Relatório de Clientes</h2>
      <button onClick={gerarPDF}>Gerar PDF</button>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>Sobrenome</th><th>CPF</th><th>Telefone</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.sobrenome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RelatorioClientes;
