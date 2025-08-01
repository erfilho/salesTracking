import { useEffect, useState } from "react";
import DashDock from "../../../components/dashDock/dashDock";
import { useAuth } from "../../auth/authContext";

import { useParams } from "react-router-dom";
import {
  getSaleDetails,
  type SaleDetails,
} from "../../../services/firestoreService";

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

  const [sale, setSale] = useState<SaleDetails>();

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
        const data = await getSaleDetails(id || "");
        setSale(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSales();
  }, [userRole]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="flex h-16 w-full flex-row items-center justify-center bg-amber-200">
        <p className="text-xl font-semibold">
          {" "}
          Venda {sale ? sale.saleNumber : "não encontrada!"} ✔{" "}
        </p>
      </div>
      <DashDock />
    </div>
  );
}

export default SalesDetails;
