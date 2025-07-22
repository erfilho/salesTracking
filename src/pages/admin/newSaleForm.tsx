import { useState } from "react";
import DashDock from "../../components/dashDock/dashDock";

import { saveSale } from "../../services/firestoreService";

import { getAuth } from "firebase/auth";

function NewSaleForm() {
  const STATUS_OPTION = [
    {
      value: "n_tem",
      label: "Não tem ( no projeto )",
    },
    {
      value: "n_iniciado",
      label: "Não iniciado",
    },
    {
      value: "c_projeto",
      label: "Com projeto",
    },
    {
      value: "em_andamento",
      label: "Em andamento",
    },
    {
      value: "ag_chegada",
      label: "Aguardando chegada",
    },
    {
      value: "ag_agendamento",
      label: "Aguardando agendamento",
    },
    {
      value: "ag_montagem",
      label: "Aguardando montagem",
    },
    {
      value: "finalizado",
      label: "Finalizado",
    },
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
  const [dataEntrada, setDataEntrada] = useState("");
  const [statusVidro, setStatusVidro] = useState("");
  const [statusAluminio, setStatusAluminio] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  // Função para salvar a venda no Firebase
  const handleSave = async () => {
    setIsSaving(true);

    console.log(user);

    await saveSale({
      saleNumber: numeroVenda,
      clientName: nomeCliente,
      productType: tipoProduto,
      enterDate: new Date(dataEntrada).toLocaleDateString("pt-BR"),
      glassStatus: statusVidro,
      aluminumStatus: statusAluminio,
    });

    setIsSaving(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-zinc-200 h-screen">
      <header className="justify-center items-center flex flex-col">
        <p className="text-xl font-semibold"> Cadastre uma nova venda 😎 </p>
        <p className="text-sm font-normal"> Preencha todos os campos! </p>
      </header>

      <form className="flex flex-col w-1/3 items-center">
        <label htmlFor="sales_number" className="text-start w-full">
          {" "}
          Número da venda{" "}
        </label>
        <input
          type="number"
          id="sales_number"
          className="px-4 py-2 rounded-lg bg-slate-400 w-1/2 self-start placeholder-white focus:outline-none"
          value={numeroVenda ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setNumeroVenda(value);
          }}
          required
        />

        <label htmlFor="client_name" className="text-start w-full">
          {" "}
          Nome do cliente{" "}
        </label>
        <input
          type="text"
          id="client_name"
          className="px-4 py-2 rounded-lg bg-slate-400 w-full placeholder-white focus:outline-none"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          required
        />

        <label htmlFor="data_entrada" className="text-start w-full">
          {" "}
          Data entrada{" "}
        </label>
        <input
          type="date"
          id="data_entrada"
          className="px-4 py-2 rounded-lg bg-slate-400 w-2/5 self-start placeholder-white focus:outline-none"
          value={dataEntrada}
          onChange={(e) => setDataEntrada(e.target.value)}
          required
        />

        <label htmlFor="status_aluminio" className="text-start w-full">
          {" "}
          Tipo do produto{" "}
        </label>
        <select
          id="status_vidro"
          value={tipoProduto}
          onChange={(e) => setTipoProduto(e.target.value)}
          className="px-4 py-2 rounded-lg bg-slate-400 w-full self-start placeholder-white focus:outline-none"
        >
          {TIPOS_PRODUCTS.map((item, key) => {
            return (
              <option value={item} key={key}>
                {" "}
                {item}{" "}
              </option>
            );
          })}
        </select>

        <div className="flex flex-row items-center gap-3 p-0 w-full">
          <div className="flex flex-col w-1/2">
            <label htmlFor="status_vidro" className="text-start w-full">
              {" "}
              Status inicial vidro{" "}
            </label>
            <select
              id="status_vidro"
              value={statusVidro}
              onChange={(e) => setStatusVidro(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-400 w-full self-start placeholder-white focus:outline-none"
            >
              {STATUS_OPTION.map(({ value, label }, index) => {
                return (
                  <option value={value} key={index}>
                    {" "}
                    {label}{" "}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="status_aluminio" className="text-start w-full">
              {" "}
              Status inicial alumínio{" "}
            </label>
            <select
              id="status_vidro"
              value={statusAluminio}
              onChange={(e) => setStatusAluminio(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-400 w-full self-start placeholder-white focus:outline-none"
            >
              {STATUS_OPTION.map(({ value, label }, index) => {
                return (
                  <option value={value} key={index}>
                    {" "}
                    {label}{" "}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <button
          disabled={isSaving}
          onClick={handleSave}
          className="my-3 px-4 py-2 rounded-lg bg-slate-400 w-1/2 self-center cursor-pointer placeholder-white focus:outline-none"
        >
          {isSaving ? "Salvando" : "Salvar"}
        </button>
      </form>
      <DashDock />
    </div>
  );
}

export default NewSaleForm;
