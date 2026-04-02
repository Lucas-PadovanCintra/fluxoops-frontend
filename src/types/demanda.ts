export type Status = "Aberta" | "Em andamento" | "Bloqueada" | "Concluída";
export type Prioridade = "Baixa" | "Média" | "Alta" | "Crítica";
export type Categoria = "Bug" | "Feature" | "Melhoria" | "Suporte" | "Infraestrutura" | "Documentação";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  is_admin: boolean;
  avatar?: string;
}

export interface Demanda {
  id: string;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  prioridade: Prioridade;
  status: Status;
  responsavel: Usuario | null;
  criador: Usuario;
  criado_em: string;
  atualizado_em: string;
  comentarios: Comentario[];
  historico: HistoricoStatus[];
}

export interface Comentario {
  id: string;
  texto: string;
  autor: Usuario;
  criado_em: string;
}

export interface HistoricoStatus {
  id: string;
  status_anterior: Status | null;
  status_novo: Status;
  alterado_por: Usuario;
  alterado_em: string;
}

export interface DashboardData {
  total_demandas: number;
  por_status: Record<Status, number>;
  por_prioridade: Record<Prioridade, number>;
}
