import { useEffect, useState } from "react";
import DashDock from "../../../components/dashDock/dashDock";
import { useAuth } from "../../auth/authContext";

import { CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { FaRegFolder } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header";
import {
  deleteSales,
  getSaleDetails,
  type SaleDetails,
} from "../../../services/firestoreService";

/*  Tipos de status
 *  ALUMÍNIO/VIDRO => Tem, Não tem, Em andamento, Aguardando chegada, Aguardando agendamento, Aguardando montagem
 *  TOTAL => Não inciado, em andamento, finalizado
 */

function SalesDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { userRole, isAdmin } = useAuth();

  const [sale, setSale] = useState<SaleDetails>();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleDetele = async (saleId?: string) => {
    if (!isAdmin) {
      return;
    }

    try {
      const deletePromise = deleteSales(saleId || "");

      await toast.promise(deletePromise, {
        loading: "Deletando venda",
        success: "Venda deletada com sucesso!",
        error: "Erro ao deletar venda",
      });

      setTimeout(() => {
        navigate("/vendas");
      }, 1200);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-2">
      {isLoading && (
        <div className="bg-dark-1 absolute top-0 right-0 flex h-full w-full items-center justify-center gap-2 text-white opacity-50">
          <CircularProgress size={48} color="inherit" />
        </div>
      )}
      <Header
        title={
          sale
            ? `Detalhes venda nº ${sale.saleNumber}`
            : "Venda não encontrada!"
        }
        icon={<FaRegFolder size={28} />}
      />

      <div className="bg-dark-1 flex h-[500px] w-full max-w-md flex-col justify-between rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex w-full flex-col gap-2">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Informações da Venda
          </h2>
          <ul className="w-full space-y-3 place-self-start self-start justify-self-start text-sm text-white sm:text-base">
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-semibold text-purple-300">
                N° da Venda:
              </span>
              <span>{sale?.saleNumber}</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-semibold text-purple-300">Cliente:</span>
              <span>{sale?.clientName}</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-semibold text-purple-300">
                Data de Entrada:
              </span>
              <span>
                {sale?.enterDate.toDate().toLocaleDateString("pt-BR")}
              </span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-semibold text-purple-300">Produto:</span>
              <span>{sale?.productType}</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-semibold text-purple-300">
                Status Vidro:
              </span>
              <span>{sale?.glassStatus}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold text-purple-300">
                Status Alumínio:
              </span>
              <span>{sale?.aluminumStatus}</span>
            </li>
          </ul>
        </div>
        <div className="w-full">
          <button
            onClick={() => handleDetele(sale?.id)}
            className="text-md cursor-pointer rounded bg-red-700 px-4 py-2 text-white hover:bg-red-800"
          >
            Excluir venda
          </button>
        </div>
      </div>
      <Toaster />
      <DashDock />
    </div>
  );
}

export default SalesDetails;
