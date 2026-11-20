
import type { Categoria, Prioridade, Status } from "./demanda";

export interface DemandaAPI {
  id: string;
  titulo: string;
  descricao: string | null;
  categoria: Categoria;
  prioridade: Prioridade;
  status: Status;
  responsavel_id: string | null;
  criador_id: string;
  criado_em: string;
  atualizado_em: string;
  total_comentarios: number;
}

export interface DemandaCreateAPI {
  titulo: string;
  descricao?: string | null;
  categoria: Categoria;
  prioridade: Prioridade;
  responsavel_id?: string | null;
}

export interface DemandaUpdateAPI
  extends Partial<DemandaCreateAPI> {
  status?: Status;
}

export interface ComentarioAPI {
  id: string;
  texto: string;
  demanda_id: string;
  autor_id: string;
  criado_em: string;
}

export interface HistoricoStatusAPI {
  id: string;
  status_anterior: Status | null;
  status_novo: Status;
  alterado_por_id: string;
  alterado_em: string;
}
