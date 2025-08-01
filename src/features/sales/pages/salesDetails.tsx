import { useEffect, useState } from "react";
import DashDock from "../../../components/dashDock/dashDock";
import { useAuth } from "../../auth/authContext";

import { useParams } from "react-router-dom";
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

function SalesDetails() {
  const { id } = useParams();

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
        <p className="text-xl font-semibold"> Venda {id} ✔ </p>
      </div>
      <DashDock />
    </div>
  );
}

export default SalesDetails;
