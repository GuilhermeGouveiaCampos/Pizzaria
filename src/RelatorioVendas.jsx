import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RelatorioVendas = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const vendasSalvas = JSON.parse(localStorage.getItem('pedidos')) || [];
    setVendas(vendasSalvas);
  }, []);

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Vendas', 14, 10);

    const tableColumn = ["ID", "Cliente", "Status"];
    const tableRows = vendas.map(venda => [
      venda.id_pedido,
      venda.cliente,
      venda.status
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid'
    });

    doc.save("Relatorio_Vendas.pdf");
  };

  return (
    <div>
      <h2>Relatório de Vendas</h2>
      <button onClick={gerarPDF}>Gerar PDF</button>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Cliente</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map(venda => (
            <tr key={venda.id_pedido}>
              <td>{venda.id_pedido}</td>
              <td>{venda.cliente}</td>
              <td>{venda.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RelatorioVendas;
