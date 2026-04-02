import React, { createContext, useContext, useState, useCallback } from "react";
import { Demanda, Usuario, Status, Prioridade, Categoria, Comentario } from "@/types/demanda";
import { mockDemandas, usuarios } from "@/data/mockData";

interface DemandasContextType {
  demandas: Demanda[];
  usuarios: Usuario[];
  currentUser: Usuario;
  addDemanda: (d: Omit<Demanda, "id" | "criado_em" | "atualizado_em" | "criador" | "comentarios" | "historico">) => void;
  updateDemanda: (id: string, updates: Partial<Demanda>) => void;
  deleteDemanda: (id: string) => void;
  addComentario: (demandaId: string, texto: string) => void;
  changeStatus: (demandaId: string, novoStatus: Status) => void;
}

const DemandasContext = createContext<DemandasContextType | null>(null);

export function DemandasProvider({ children }: { children: React.ReactNode }) {
  const [demandas, setDemandas] = useState<Demanda[]>(mockDemandas);
  const currentUser = usuarios[0];

  const addDemanda = useCallback((d: Omit<Demanda, "id" | "criado_em" | "atualizado_em" | "criador" | "comentarios" | "historico">) => {
    const now = new Date().toISOString();
    const nova: Demanda = {
      ...d,
      id: crypto.randomUUID(),
      criador: currentUser,
      criado_em: now,
      atualizado_em: now,
      comentarios: [],
      historico: [{ id: crypto.randomUUID(), status_anterior: null, status_novo: d.status, alterado_por: currentUser, alterado_em: now }],
    };
    setDemandas((prev) => [nova, ...prev]);
  }, [currentUser]);

  const updateDemanda = useCallback((id: string, updates: Partial<Demanda>) => {
    setDemandas((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates, atualizado_em: new Date().toISOString() } : d))
    );
  }, []);

  const deleteDemanda = useCallback((id: string) => {
    setDemandas((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const addComentario = useCallback((demandaId: string, texto: string) => {
    const comentario: Comentario = {
      id: crypto.randomUUID(),
      texto,
      autor: currentUser,
      criado_em: new Date().toISOString(),
    };
    setDemandas((prev) =>
      prev.map((d) =>
        d.id === demandaId ? { ...d, comentarios: [...d.comentarios, comentario], atualizado_em: new Date().toISOString() } : d
      )
    );
  }, [currentUser]);

  const changeStatus = useCallback((demandaId: string, novoStatus: Status) => {
    setDemandas((prev) =>
      prev.map((d) => {
        if (d.id !== demandaId) return d;
        const now = new Date().toISOString();
        return {
          ...d,
          status: novoStatus,
          atualizado_em: now,
          historico: [
            ...d.historico,
            { id: crypto.randomUUID(), status_anterior: d.status, status_novo: novoStatus, alterado_por: currentUser, alterado_em: now },
          ],
        };
      })
    );
  }, [currentUser]);

  return (
    <DemandasContext.Provider value={{ demandas, usuarios, currentUser, addDemanda, updateDemanda, deleteDemanda, addComentario, changeStatus }}>
      {children}
    </DemandasContext.Provider>
  );
}

export function useDemandas() {
  const ctx = useContext(DemandasContext);
  if (!ctx) throw new Error("useDemandas must be used within DemandasProvider");
  return ctx;
}
