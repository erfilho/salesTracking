import { useEffect, useState } from "react";
import DashDock from "../../../components/dashDock/dashDock";
import { useAuth } from "../../auth/authContext";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getSales,
  updateSaleStatus,
  type SaleDetails,
} from "../../../services/firestoreService";

import { FaListAlt } from "react-icons/fa";
import ConfirmAlert from "../../../components/confirmAlert";
import Header from "../../../components/header";

const TABLE_HEAD = [
  "N° VENDA",
  "CLIENTE",
  "TIPO DE PRODUTO",
  "ENTRADA",
  "STATUS VIDRO",
  "STATUS ALUMÍNIO",
  "AÇÃO",
];

const STATUS_OPTION = [
  "Não tem ( no projeto )",
  "Não iniciado",
  "Com projeto",
  "Em andamento",
  "Aguardando chegada",
  "Aguardando agendamento",
  "Aguardando montagem",
  "Finalizado",
];

/*  Tipos de status
 *  ALUMÍNIO/VIDRO => Tem, Não tem, Em andamento, Aguardando chegada, Aguardando agendamento, Aguardando montagem
 *  TOTAL => Não inciado, em andamento, finalizado
 */

function SalesList() {
  const navigate = useNavigate();
  const { userRole, isAdmin } = useAuth();

  const [sales, setSales] = useState<SaleDetails[]>([]);
  const [confirmation, setConfirmation] = useState<{
    saleId: string;
    type: string;
  } | null>(null);

  const handleDetail = (saleId: string) => {
    navigate(`/vendas/${saleId}`);
  };

  const handleUpdateStatus = async (id_venda: string, type: string) => {
    if (!isAdmin) return;

    // Atribuindo o status de acordo com o tipo selecionado
    const field = type === "aluminio" ? "aluminumStatus" : "glassStatus";

    // Procurando a venda no array
    const sale = sales.find((s) => s.id === id_venda);

    if (!sale) return;

    // Definindo o próximo status da venda
    const currentStatus = sale[field as keyof SaleDetails] as string;
    const currentIndex = STATUS_OPTION.indexOf(currentStatus);
    const nextStatus = STATUS_OPTION[(currentIndex + 1) % STATUS_OPTION.length];

    if (currentIndex == STATUS_OPTION.length - 1) {
      // Caso já esteja com o status máximo
      toast.success(`Venda com status de ${type} já finalizado!`, {
        icon: "😎",
      });
      setConfirmation(null);
    } else if (currentStatus == STATUS_OPTION[0]) {
      // Caso esteja com o status definido como não utilizável, por exemplo: não ter vidro na venda, ou alumínio
      toast(`Venda sem ${type} no projeto!`, { icon: "🤗" });
      setConfirmation(null);
    } else {
      try {
        // Writing a promise for use with toast
        const updatePromise = updateSaleStatus(
          id_venda,
          field as "glassStatus" | "aluminumStatus",
          nextStatus,
        );

        // Update the status with toast promise
        await toast.promise(updatePromise, {
          loading: "Atualizando o status",
          success: "Status atualizado com sucesso!",
          error: "Erro ao atualizar o status",
        });

        // Update the sales list without refresh page
        setSales((prev) =>
          prev.map((s) =>
            s.id == id_venda ? { ...s, [field]: nextStatus } : s,
          ),
        );

        // Removing the confirmation popup
        setConfirmation(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Buscando as vendas no banco de dados
  useEffect(() => {
    const fetchSales = async () => {
      if (!userRole) return;

      try {
        // Buscando as vendas
        const data = await getSales();

        // Sorting the sales by date in descending order
        const sortedByDateData = (data || [])?.sort((a, b) => {
          return (
            b.enterDate.toDate().getTime() - a.enterDate.toDate().getTime()
          );
        });

        setSales(sortedByDateData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSales();
  }, [userRole]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-2">
      <Header title={`Listagem de vendas`} icon={<FaListAlt  size={28}/>} />
      {/* Confirmation popup */}
      {confirmation && (
        <ConfirmAlert
          title="Atualizar status"
          message={`Você tem certeza que deseja atualizar o status de ${confirmation.type} dessa venda?`}
          onConfirm={() =>
            handleUpdateStatus(confirmation.saleId, confirmation.type)
          }
          onCancel={() => setConfirmation(null)}
        />
      )}
      <div className="h-10/12 w-11/12 rounded-xl bg-gray-300 p-4">
        <table className="w-full">
          <thead>
            <tr>
              {TABLE_HEAD.map((item, key) => (
                <th key={key} className="px-2 text-center text-sm">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => {
              const classes =
                "p-4 text-center text-sm border-b border-slate-800 items-center justify-between";

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
                        : `pointer-events-none${classes}`
                    }
                    onClick={() =>
                      setConfirmation({ saleId: sale.id, type: "vidro" })
                    }
                  >
                    {sale.glassStatus}
                  </td>
                  <td
                    className={
                      isAdmin
                        ? `cursor-pointer ${classes}`
                        : `pointer-events-none ${classes}`
                    }
                    onClick={() =>
                      setConfirmation({ saleId: sale.id, type: "aluminio" })
                    }
                  >
                    {sale.aluminumStatus}
                  </td>
                  <td
                    className={`cursor-pointer ${classes} `}
                    onClick={() => handleDetail(sale.id)}
                  >
                    {" "}
                    Ver Detalhes 🔎
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <DashDock />
      <Toaster />
    </div>
  );
}

export default SalesList;
