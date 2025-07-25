import { useEffect, useState } from "react";
import DashDock from "../../../components/dashDock/dashDock";
import { useAuth } from "../../auth/authContext";

import { getSales, type SaleDetails } from "../../../services/firestoreService";

const TABLE_HEAD = [
  "N° VENDA",
  "CLIENTE",
  "TIPO DE PRODUTO",
  "DATA DE ENTRADA",
  "STATUS_VIDRO",
  "STATUS_ALUMINIO",
  "AÇÃO",
];

/*  Tipos de status
 *  ALUMÍNIO/VIDRO => Tem, Não tem, Em andamento, Aguardando chegada, Aguardando agendamento, Aguardando montagem
 *  TOTAL => Não inciado, em andamento, finalizado
 */

const TABLE_DATA = [
  {
    NUM_VENDA: 156,
    NOME_CLIENTE: "Erineldo Filho",
    TIPO_PRODUTO: "portão automático",
    DATA_ENTRADA: "2022-01-01",
    ST_VIDRO: "Sim",
    ST_ALUMINIO: "Não",
  },
  {
    NUM_VENDA: 154,
    NOME_CLIENTE: "Erineldo Filho",
    TIPO_PRODUTO: "portão automático",
    DATA_ENTRADA: "2022-01-01",
    ST_VIDRO: "Sim",
    ST_ALUMINIO: "Não",
  },
  {
    NUM_VENDA: 152,
    NOME_CLIENTE: "Erineldo Filho",
    TIPO_PRODUTO: "portão automático",
    DATA_ENTRADA: "2022-01-01",
    ST_VIDRO: "Sim",
    ST_ALUMINIO: "Não",
  },
  {
    NUM_VENDA: 150,
    NOME_CLIENTE: "Erineldo Filho",
    TIPO_PRODUTO: "portão automático",
    DATA_ENTRADA: "2022-01-01",
    ST_VIDRO: "Sim",
    ST_ALUMINIO: "Não",
  },
];

function SalesList() {
  const { userRole, isAdmin } = useAuth();

  const [sales, setSales] = useState<SaleDetails[]>([]);

  function handleDetail(num_venda: string) {
    return alert(num_venda);
  }

  function handleUpdateStatus(num_venda: string, type: string) {
    return alert(`${num_venda} - ${type}`);
  }

  // Buscando as vendas no banco de dados
  useEffect(() => {
    const fetchSales = async () => {
      if (!userRole) return;

      try {
        const data = await getSales();
        setSales(data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSales();
  }, [userRole]);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full gap-2">
      <div className="flex flex-row w-full h-16 bg-amber-200 justify-center items-center">
        <p className="text-xl font-semibold"> Listagem de Vendas ✔ </p>
      </div>
      <div className="h-10/12 w-3/4 bg-cyan-100">
        <table className="w-full">
          <thead>
            <tr>
              {TABLE_HEAD.map((item, key) => (
                <th key={key} className="text-center px-2">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => {
              const classes = "p-4 text-center";

              return (
                <tr key={sale.id}>
                  <td className={classes}>{sale.saleNumber}</td>
                  <td className={classes}>{sale.clientName}</td>
                  <td className={classes}>{sale.productType}</td>
                  <td className={classes}>
                    {sale.enterDate.toDate().toLocaleDateString("pt-BR")}
                  </td>
                  <td
                    className={
                      isAdmin
                        ? `cursor-pointer ${classes}`
                        : `cursor-not-allowed ${classes}`
                    }
                    onClick={() => handleUpdateStatus(sale.id, "vidro")}
                  >
                    {sale.glassStatus}
                  </td>
                  <td
                    className={
                      isAdmin
                        ? `cursor-pointer ${classes}`
                        : `cursor-not-allowed ${classes}`
                    }
                    onClick={() => handleUpdateStatus(sale.id, "vidro")}
                  >
                    {sale.aluminumStatus}
                  </td>
                  <td
                    className={`cursor-pointer ${classes}`}
                    onClick={() => handleDetail(sale.id)}
                  >
                    {" "}
                    Ver Detalhes 👁️{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <DashDock />
    </div>
  );
}

export default SalesList;
