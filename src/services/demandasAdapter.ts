import type {
  Demanda,
  Usuario,
  HistoricoStatus,
  Comentario,
} from "@/types/demanda";

import type {
  DemandaAPI,
  HistoricoStatusAPI,
  ComentarioAPI,
} from "@/types/api";

export function adaptarDemanda(
  demandaAPI: DemandaAPI,
  usuarios: Usuario[]
): Demanda {
  const responsavel =
    usuarios.find(
      (usuario) => usuario.id === demandaAPI.responsavel_id
    ) ?? null;

  const criador = usuarios.find(
    (usuario) => usuario.id === demandaAPI.criador_id
  );

  if (!criador) {
    throw new Error(
      `Criador não encontrado para a demanda ${demandaAPI.id}`
    );
  }

  return {
    id: demandaAPI.id,
    titulo: demandaAPI.titulo,
    descricao: demandaAPI.descricao ?? "",
    categoria: demandaAPI.categoria,
    prioridade: demandaAPI.prioridade,
    status: demandaAPI.status,
    responsavel,
    criador,
    criado_em: demandaAPI.criado_em,
    atualizado_em: demandaAPI.atualizado_em,
    comentarios: [],
    historico: [],
  };
}

export function adaptarHistorico(
  historicoAPI: HistoricoStatusAPI,
  usuarios: Usuario[]
): HistoricoStatus {
  const alteradoPor = usuarios.find(
    (usuario) => usuario.id === historicoAPI.alterado_por_id
  );

  if (!alteradoPor) {
    throw new Error(
      `Usuário não encontrado para o histórico ${historicoAPI.id}`
    );
  }

  return {
    id: historicoAPI.id,
    status_anterior: historicoAPI.status_anterior,
    status_novo: historicoAPI.status_novo,
    alterado_por: alteradoPor,
    alterado_em: historicoAPI.alterado_em,
  };
}

export function adaptarComentario(
  comentarioAPI: ComentarioAPI,
  usuarios: Usuario[]
): Comentario {
  const autor = usuarios.find(
    (usuario) => usuario.id === comentarioAPI.autor_id
  );

  if (!autor) {
    throw new Error(
      `Autor não encontrado para o comentário ${comentarioAPI.id}`
    );
  }

  return {
    id: comentarioAPI.id,
    texto: comentarioAPI.texto,
    autor,
    criado_em: comentarioAPI.criado_em,
  };
}
