import { useState } from "react";

import { toast, Toaster } from "react-hot-toast";

import { Timestamp } from "firebase/firestore";
import { FaCartPlus } from "react-icons/fa";
import DashDock from "../../../components/dashDock/dashDock";
import Header from "../../../components/header";
import { saveSale } from "../../../services/firestoreService";

function NewSaleForm() {
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

  const TIPOS_PRODUCTS = [
    "Vidro temperado M2000",
    "Esquadria de alumínio + vidro",
    "Vidro temperado fixo",
    "Portão automático",
    "Portão de alumínio",
    "Guarda corpo",
    "Pele de vidro",
    "Granitos",
  ];

  const [numeroVenda, setNumeroVenda] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [dataEntrada, setDataEntrada] = useState<string>("");
  const [statusVidro, setStatusVidro] = useState("");
  const [statusAluminio, setStatusAluminio] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  // Função para salvar a venda no Firebase
  const handleSave = async () => {
    setIsSaving(true);

    try {
      const salePromise = saveSale({
        saleNumber: numeroVenda,
        clientName: nomeCliente,
        productType: tipoProduto,
        enterDate: Timestamp.fromDate(new Date(dataEntrada)),
        glassStatus: statusVidro,
        aluminumStatus: statusAluminio,
      });

      await toast.promise(salePromise, {
        loading: "Salvando a venda",
        success: "Venda salva com sucesso",
        error: "Erro ao salvar a venda",
      });

      setNumeroVenda("");
      setNomeCliente("");
      setTipoProduto("");
      setDataEntrada("");
      setStatusVidro("");
      setStatusAluminio("");
    } catch (error) {
      console.error(error);
    }

    setIsSaving(false);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-2">
      <Header title={`Cadastrar nova venda`} icon={<FaCartPlus size={28} />} />

      <form className="flex w-1/3 flex-col items-center gap-2">
        <p className="py-4"> Preencha todas as informações </p>
        <label htmlFor="sales_number" className="w-full text-start">
          {" "}
          Número da venda{" "}
        </label>
        <input
          type="number"
          id="sales_number"
          className="w-1/2 self-start rounded-lg bg-slate-400 px-4 py-2 placeholder-white focus:outline-none"
          value={numeroVenda ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setNumeroVenda(value);
          }}
          required
        />

        <label htmlFor="client_name" className="w-full text-start">
          {" "}
          Nome do cliente{" "}
        </label>
        <input
          type="text"
          id="client_name"
          className="w-full rounded-lg bg-slate-400 px-4 py-2 placeholder-white focus:outline-none"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          required
        />

        <label htmlFor="data_entrada" className="w-full text-start">
          {" "}
          Data entrada{" "}
        </label>
        <input
          type="date"
          id="data_entrada"
          className="w-2/5 cursor-pointer self-start rounded-lg bg-slate-400 px-4 py-2 placeholder-white focus:outline-none"
          value={dataEntrada}
          onChange={(e) => setDataEntrada(e.target.value)}
          required
        />

        <label htmlFor="tipo_produto" className="w-full text-start">
          {" "}
          Tipo do produto{" "}
        </label>
        <select
          id="tipo_produto"
          value={tipoProduto}
          onChange={(e) => setTipoProduto(e.target.value)}
          className="w-full cursor-pointer self-start rounded-lg bg-slate-400 px-4 py-2 placeholder-white focus:outline-none"
        >
          <option value="" disabled>
            {" "}
            Selecione o tipo do produto{" "}
          </option>
          {TIPOS_PRODUCTS.map((item, key) => {
            return (
              <option value={item} key={key}>
                {" "}
                {item}{" "}
              </option>
            );
          })}
        </select>

        <div className="flex w-full flex-row items-center gap-3 p-0">
          <div className="flex w-1/2 flex-col">
            <label htmlFor="status_vidro" className="w-full text-start">
              {" "}
              Status inicial vidro{" "}
            </label>
            <select
              id="status_vidro"
              value={statusVidro}
              onChange={(e) => setStatusVidro(e.target.value)}
              className="w-full cursor-pointer self-start rounded-lg bg-slate-400 px-4 py-2 placeholder-white focus:outline-none"
            >
              <option value="" disabled>
                {" "}
                Selecione o status{" "}
              </option>
              {STATUS_OPTION.map((value, index) => {
                return (
                  <option value={value} key={index}>
                    {" "}
                    {value}{" "}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex w-1/2 flex-col">
            <label htmlFor="status_aluminio" className="w-full text-start">
              {" "}
              Status inicial alumínio{" "}
            </label>
            <select
              id="status_vidro"
              value={statusAluminio}
              onChange={(e) => setStatusAluminio(e.target.value)}
              className="w-full cursor-pointer self-start rounded-lg bg-slate-400 px-4 py-2 placeholder-white focus:outline-none"
              aria-placeholder="Status do vidro"
            >
              <option value="" disabled>
                {" "}
                Selecione o status{" "}
              </option>
              {STATUS_OPTION.map((value, index) => {
                return (
                  <option value={value} key={index}>
                    {" "}
                    {value}{" "}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="my-3 w-1/2 cursor-pointer self-center rounded-lg bg-slate-400 px-4 py-2 placeholder-white focus:outline-none"
        >
          {isSaving ? "Salvando" : "Salvar"}
        </button>
      </form>
      <DashDock />
      <Toaster />
    </div>
  );
}

export default NewSaleForm;
