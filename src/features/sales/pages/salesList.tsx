import { useEffect, useState } from "react";
import DashDock from "../../../components/dashDock/dashDock";
import { useAuth } from "../../auth/authContext";

import toast, { Toaster } from "react-hot-toast";
import {
  getSales,
  updateSaleStatus,
  type SaleDetails,
} from "../../../services/firestoreService";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "N° VENDA",
  "CLIENTE",
  "TIPO DE PRODUTO",
  "DATA DE ENTRADA",
  "STATUS_VIDRO",
  "STATUS_ALUMINIO",
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
  const { userRole, isAdmin } = useAuth();

  const [sales, setSales] = useState<SaleDetails[]>([]);

  const navigate = useNavigate();

  const handleDetail = (saleId: string) => {
    navigate(`/vendas/${saleId}`);
  };

  const handleUpdateStatus = async (id_venda: string, type: string) => {
    if (!isAdmin) return;

    const field = type === "aluminio" ? "aluminumStatus" : "glassStatus";

    const sale = sales.find((s) => s.id === id_venda);
    if (!sale) return;

    const currentStatus = sale[field as keyof SaleDetails] as string;
    const currentIndex = STATUS_OPTION.indexOf(currentStatus);
    const nextStatus = STATUS_OPTION[(currentIndex + 1) % STATUS_OPTION.length];

    try {
      const updatePromise = updateSaleStatus(
        id_venda,
        field as "glassStatus" | "aluminumStatus",
        nextStatus
      );

      await toast.promise(updatePromise, {
        loading: "Atualizando o status",
        success: "Status atualizado com sucesso!",
        error: "Erro ao atualizar o status",
      });

      setSales((prev) =>
        prev.map((s) => (s.id == id_venda ? { ...s, [field]: nextStatus } : s))
      );
    } catch (error) {
      console.error(error);
    }
  };

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
                    onClick={() => handleUpdateStatus(sale.id, "aluminio")}
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
      <Toaster />
    </div>
  );
}

export default SalesList;
