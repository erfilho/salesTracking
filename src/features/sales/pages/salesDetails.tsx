import { useEffect, useState } from "react";
import DashDock from "../../../components/dashDock/dashDock";
import { useAuth } from "../../auth/authContext";

import { CircularProgress } from "@mui/material";
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

  const [isLoading, setIsLoading] = useState(false);

  function handleDetail(num_venda: string) {
    return alert(num_venda);
  }

  function handleUpdateStatus(num_venda: string, type: string) {
    return alert(`${num_venda} - ${type}`);
  }

  // Buscando a venda no banco de dados
  useEffect(() => {
    setIsLoading(true);
    const fetchSales = async () => {
      if (!userRole) return;

      try {
        const data = await getSaleDetails(id || "");
        setSale(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSales();
  }, [userRole]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-2">
      {isLoading && (
        <div className="bg-purple-2 absolute top-0 right-0 flex h-full w-full items-center justify-center gap-2 text-white opacity-50">
          <CircularProgress size={48} color="inherit" />
        </div>
      )}
      <div className="bg-purple-1 flex h-16 w-full flex-row items-center justify-center">
        <p className="text-xl font-semibold text-white">
          {" "}
          Venda {sale ? sale.saleNumber : "não encontrada!"} ✔{" "}
        </p>
      </div>
      <DashDock />
    </div>
  );
}

export default SalesDetails;
