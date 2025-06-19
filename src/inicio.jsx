import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./Inicio.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Inicio = () => {
  const [pedidos, setPedidos] = useState([]);
  const [statusContagem, setStatusContagem] = useState({
    entregues: 0,
    emProducao: 0,
    aguardando: 0,
  });

  useEffect(() => {
    const pedidosSalvos = JSON.parse(localStorage.getItem('pedidos'));

    if (!pedidosSalvos || pedidosSalvos.length === 0) {
      const pedidosFalsos = [
        { id_pedido: 101, cliente: "João Silva", status: "aguardando" },
        { id_pedido: 102, cliente: "Maria Oliveira", status: "aguardando" },
        { id_pedido: 103, cliente: "Carlos Lima", status: "pendente" },
        { id_pedido: 104, cliente: "Ana Paula", status: "completo" },
        { id_pedido: 105, cliente: "Ricardo Borges", status: "pendente" },
        { id_pedido: 106, cliente: "Juliana Souza", status: "aguardando" },
        { id_pedido: 107, cliente: "Felipe Castro", status: "completo" },
        { id_pedido: 108, cliente: "Roberta Teixeira", status: "pendente" },
        { id_pedido: 109, cliente: "Lucas Andrade", status: "completo" },
        { id_pedido: 110, cliente: "Patrícia Gomes", status: "aguardando" }
      ];

      localStorage.setItem("pedidos", JSON.stringify(pedidosFalsos));
      setPedidos(pedidosFalsos);
    } else {
      setPedidos(pedidosSalvos);
    }
  }, []);

  useEffect(() => {
    const contagem = {
      entregues: pedidos.filter((pedido) => pedido.status === "completo").length,
      emProducao: pedidos.filter((pedido) => pedido.status === "pendente").length,
      aguardando: pedidos.filter((pedido) => pedido.status === "aguardando").length,
    };
    setStatusContagem(contagem);
  }, [pedidos]);

  const handleStatusUpdate = (pedidoId, novoStatus) => {
    const pedidosAtualizados = pedidos.map((pedido) =>
      pedido.id_pedido === pedidoId ? { ...pedido, status: novoStatus } : pedido
    );
    setPedidos(pedidosAtualizados);
    localStorage.setItem('pedidos', JSON.stringify(pedidosAtualizados));
  };

  const getFilteredPedidos = (status) =>
    pedidos.filter((pedido) => pedido.status === status).slice(0, 10);

  const pieData = {
    labels: ["Entregues", "Em Produção", "Aguardando"],
    datasets: [
      {
        label: "Status dos Pedidos",
        data: [statusContagem.entregues, statusContagem.emProducao, statusContagem.aguardando],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Página Inicial</h1>

      <div className={styles.pieChartContainer}>
        <h2>Status dos Pedidos</h2>
        <Pie data={pieData} />
      </div>

      <div className={styles.approvalContainer}>
        <div className={styles.column}>
          <h2 className={styles.statusTitle}>Aguardando Aceitação</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredPedidos("aguardando").map((pedido) => (
                <tr key={pedido.id_pedido}>
                  <td>{pedido.id_pedido}</td>
                  <td>{pedido.cliente}</td>
                  <td>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleStatusUpdate(pedido.id_pedido, "pendente")}
                    >
                      Aceitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.column}>
          <h2 className={styles.statusTitle}>Aguardando Finalização</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredPedidos("pendente").map((pedido) => (
                <tr key={pedido.id_pedido}>
                  <td>{pedido.id_pedido}</td>
                  <td>{pedido.cliente}</td>
                  <td>
                    <button
                      className={`${styles.actionButton} ${styles.finalize}`}
                      onClick={() => handleStatusUpdate(pedido.id_pedido, "completo")}
                    >
                      Finalizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.column}>
          <h2 className={styles.statusTitle}>Pedidos Concluídos</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredPedidos("completo").map((pedido) => (
                <tr key={pedido.id_pedido}>
                  <td>{pedido.id_pedido}</td>
                  <td>{pedido.cliente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
