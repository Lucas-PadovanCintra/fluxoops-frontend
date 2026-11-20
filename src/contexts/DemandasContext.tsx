
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import {
  Demanda,
  Usuario,
  Status,
  Prioridade,
  Categoria,
  Comentario,
} from "@/types/demanda";

import { listarUsuarios } from "@/services/usuarios";
import { listarDemandas, criarDemanda, atualizarDemanda, listarHistorico, excluirDemanda } from "@/services/demandas";
import { adaptarDemanda, adaptarHistorico, adaptarComentario } from "@/services/demandasAdapter";
import { listarComentarios, criarComentario } from "@/services/comentarios";
import { useAuth } from "@/contexts/AuthContext";


interface DemandasContextType {
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

const DemandasContext = createContext<DemandasContextType | null>(null);

export function DemandasProvider({ children }: { children: React.ReactNode }) {

  const { usuario: usuarioAutenticado } = useAuth();

  const [demandas, setDemandas] = useState<Demanda[]>([]);
  const [usuariosReais, setUsuariosReais] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioAutenticado) {
      setDemandas([]);
      setUsuariosReais([]);
      setCarregando(false);
      setErro(null);
      return;
    }

    let ativo = true;

    async function carregarDados() {
      setCarregando(true);
      setErro(null);

      try {
        const [usuariosAPI, demandasAPI] = await Promise.all([
          listarUsuarios(),
          listarDemandas(),
        ]);

        const demandasAdaptadas = demandasAPI.map((demanda) =>
          adaptarDemanda(demanda, usuariosAPI)
        );

        if (ativo) {
          setUsuariosReais(usuariosAPI);
          setDemandas(demandasAdaptadas);
        }
      } catch (error) {
        if (ativo) {
          console.error("Erro ao carregar dados do FluxoOps:", error);
          setErro("Não foi possível carregar os dados.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, [usuarioAutenticado]);

  const addDemanda = useCallback(async (
    d: Omit<
      Demanda,
      "id" | "criado_em" | "atualizado_em" | "criador" | "comentarios" | "historico"
    >
  ): Promise<void> => {
    const dados = {
      titulo: d.titulo,
      descricao: d.descricao,
      categoria: d.categoria,
      prioridade: d.prioridade,
      responsavel_id: d.responsavel?.id ?? null,
    };

    const demandaCriada = await criarDemanda(dados);

    const demandaAdaptada = adaptarDemanda(
      demandaCriada,
      usuariosReais
    );

    setDemandas((prev) => [demandaAdaptada, ...prev]);
  }, [usuariosReais]);

  const updateDemanda = useCallback(async (
    id: string,
    updates: Partial<Demanda>
  ): Promise<void> => {
    const dados = {
      titulo: updates.titulo,
      descricao: updates.descricao,
      categoria: updates.categoria,
      prioridade: updates.prioridade,
      responsavel_id:
        updates.responsavel === undefined
          ? undefined
          : updates.responsavel?.id ?? null,
    };

    const demandaAtualizada = await atualizarDemanda(id, dados);

    setDemandas((prev) =>
      prev.map((demanda) =>
        demanda.id === id
          ? {
              ...adaptarDemanda(demandaAtualizada, usuariosReais),
              comentarios: demanda.comentarios,
              historico: demanda.historico,
            }
          : demanda
      )
    );
  }, [usuariosReais]);

  const deleteDemanda = useCallback(async (
    id: string
  ): Promise<void> => {
    await excluirDemanda(id);

    setDemandas((prev) =>
      prev.filter((demanda) => demanda.id !== id)
    );
  }, []);

  const addComentario = useCallback(async (
    demandaId: string,
    texto: string
  ): Promise<void> => {
    const comentarioAPI = await criarComentario(demandaId, texto);

    const comentarioAdaptado = adaptarComentario(
      comentarioAPI,
      usuariosReais
    );

    setDemandas((prev) =>
      prev.map((demanda) =>
        demanda.id === demandaId
          ? {
              ...demanda,
              total_comentarios: demanda.total_comentarios + 1,
              comentarios: [
                ...demanda.comentarios,
                comentarioAdaptado,
              ],
            }
          : demanda
      )
    );
  }, [usuariosReais]);

  const carregarComentarios = useCallback(async (
    demandaId: string
  ): Promise<void> => {
    const comentariosAPI = await listarComentarios(demandaId);

    const comentariosAdaptados = comentariosAPI.map((comentario) =>
      adaptarComentario(comentario, usuariosReais)
    );

    setDemandas((prev) =>
      prev.map((demanda) =>
        demanda.id === demandaId
          ? {
              ...demanda,
              comentarios: comentariosAdaptados,
            }
          : demanda
      )
    );
  }, [usuariosReais]);

  const changeStatus = useCallback(async (
    demandaId: string,
    novoStatus: Status
  ): Promise<void> => {
    const demandaAtualizada = await atualizarDemanda(demandaId, {
      status: novoStatus,
    });

    const historicoAPI = await listarHistorico(demandaId);

    const historicoAtualizado = historicoAPI.map((registro) =>
      adaptarHistorico(registro, usuariosReais)
    );

    setDemandas((prev) =>
      prev.map((d) =>
        d.id === demandaId
          ? {
              ...d,
              ...adaptarDemanda(demandaAtualizada, usuariosReais),
              comentarios: d.comentarios,
              historico: historicoAtualizado,
            }
          : d
      )
    );
  }, [usuariosReais]);

  const carregarHistorico = useCallback(async (
    demandaId: string
  ): Promise<void> => {
    const historicoAPI = await listarHistorico(demandaId);

    const historicoAdaptado = historicoAPI.map((registro) =>
      adaptarHistorico(registro, usuariosReais)
    );

    setDemandas((prev) =>
      prev.map((demanda) =>
        demanda.id === demandaId
          ? {
              ...demanda,
              historico: historicoAdaptado,
            }
          : demanda
      )
    );
  }, [usuariosReais]);

  return (
    <DemandasContext.Provider
      value={{
        demandas,
        usuarios: usuariosReais,
        carregando,
        erro,
        addDemanda,
        updateDemanda,
        deleteDemanda,
        addComentario,
        carregarComentarios,
        changeStatus,
        carregarHistorico,
      }}
    >
      {children}
    </DemandasContext.Provider>
  );
}

export function useDemandas() {
  const ctx = useContext(DemandasContext);
  if (!ctx) throw new Error("useDemandas must be used within DemandasProvider");
  return ctx;
}
