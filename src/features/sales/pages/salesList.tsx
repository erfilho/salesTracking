import { useEffect, useState } from "react";
import DashDock from "../../../components/dashDock/dashDock";
import { useAuth } from "../../auth/authContext";

import { useNavigate } from "react-router-dom";
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

function SalesList() {
  const { userRole, isAdmin } = useAuth();

  const [sales, setSales] = useState<SaleDetails[]>([]);

  const navigate = useNavigate();

  const handleDetail = (saleId: string) => {
    navigate(`/vendas/${saleId}`);
  };

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
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="flex h-16 w-full flex-row items-center justify-center bg-amber-200">
        <p className="text-xl font-semibold"> Listagem de Vendas ✔ </p>
      </div>
      <div className="h-10/12 w-3/4 bg-cyan-100">
        <table className="w-full">
          <thead>
            <tr>
              {TABLE_HEAD.map((item, key) => (
                <th key={key} className="px-2 text-center">
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
