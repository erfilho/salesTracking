import { useAuth } from "../../auth/AuthContext";
import DashDock from "../../components/dashDock/dashDock";

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
  const { isAdmin } = useAuth();

  function handleDetail(num_venda: number) {
    return alert(num_venda);
  }

  function handleUpdateStatus(num_venda: number, type: string) {
    return alert(`${num_venda} - ${type}`);
  }

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
            {TABLE_DATA.map(
              (
                {
                  NUM_VENDA,
                  NOME_CLIENTE,
                  TIPO_PRODUTO,
                  DATA_ENTRADA,
                  ST_VIDRO,
                  ST_ALUMINIO,
                },
                index
              ) => {
                const isLast = index === TABLE_DATA.length - 1;
                const classes = isLast
                  ? "p-4 text-center"
                  : "p-4 text-center border-b border-blue-gray-50";

                return (
                  <tr key={NUM_VENDA}>
                    <td className={classes}>{NUM_VENDA}</td>
                    <td className={classes}>{NOME_CLIENTE}</td>
                    <td className={classes}>{TIPO_PRODUTO}</td>
                    <td className={classes}>{DATA_ENTRADA}</td>
                    <td
                      className={
                        isAdmin
                          ? `cursor-pointer ${classes}`
                          : `cursor-not-allowed ${classes}`
                      }
                      onClick={() => handleUpdateStatus(NUM_VENDA, "vidro")}
                    >
                      {ST_VIDRO}
                    </td>
                    <td
                      className={
                        isAdmin
                          ? `cursor-pointer ${classes}`
                          : `cursor-not-allowed ${classes}`
                      }
                      onClick={() => handleUpdateStatus(NUM_VENDA, "vidro")}
                    >
                      {ST_ALUMINIO}
                    </td>
                    <td
                      className={`cursor-pointer ${classes}`}
                      onClick={() => handleDetail(NUM_VENDA)}
                    >
                      {" "}
                      Ver Detalhes 👁️{" "}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      <DashDock />
    </div>
  );
}

export default SalesList;
