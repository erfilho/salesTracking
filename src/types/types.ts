import { type User } from "firebase/auth";

export type AppUser = User & {
  role?: "admin" | "viewer";
};

export interface Sale {
  id?: string;
  numVenda: string;
  nomeCliente: string;
  tipoProduto:
    | "Portão automático"
    | "Portão de alumínio"
    | "Janelas m2000"
    | "Portas m2000"
    | "Janelas e Portas m2000"
    | "Vidro fixo"
    | "Esquadria de alumínio e vidro";
  dataEntrada: Date;
  statusVidro:
    | "Não tem"
    | "Pendente medida"
    | "Pendente projeto"
    | "Pendente pedido"
    | "Aguardando vidro"
    | "Aguardando agendamento"
    | "Finalizado";
  statusAluminio:
    | "Não tem"
    | "Pendente medida"
    | "Pendente projeto"
    | "Pendente pedido"
    | "Aguardando vidro"
    | "Aguardando agendamento"
    | "Finalizado";
  statusTotal: "Não iniciado" | "Em andamento" | "Finalizado";
}
