import { createContext } from "react";
import type { Demanda, Usuario, Status } from "@/types/demanda";

export interface DemandasContextType {
  demandas: Demanda[];
  usuarios: Usuario[];
  carregando: boolean;
  erro: string | null;
  addDemanda: (d: Omit<Demanda, "id" | "criado_em" | "atualizado_em" | "criador" | "comentarios" | "historico">) => Promise<void>;
  updateDemanda: (id: string, updates: Partial<Demanda>) => Promise<void>;
  deleteDemanda: (id: string) => Promise<void>;
  addComentario: (demandaId: string, texto: string) => Promise<void>;
  carregarComentarios: (demandaId: string) => Promise<void>;
  changeStatus: (demandaId: string, novoStatus: Status) => Promise<void>;
  carregarHistorico: (demandaId: string) => Promise<void>;
}

export const DemandasContext = createContext<DemandasContextType | null>(null);
