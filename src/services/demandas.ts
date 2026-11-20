
import { apiRequest } from "./api";
import type {
  DemandaAPI,
  DemandaCreateAPI,
  DemandaUpdateAPI,
  HistoricoStatusAPI,
} from "@/types/api";

export async function listarDemandas(): Promise<DemandaAPI[]> {
  return apiRequest<DemandaAPI[]>("/api/demandas/");
}

export async function criarDemanda(
  dados: DemandaCreateAPI
): Promise<DemandaAPI> {
  return apiRequest<DemandaAPI>("/api/demandas/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
}

export async function atualizarDemanda(
  id: string,
  dados: DemandaUpdateAPI
): Promise<DemandaAPI> {
  return apiRequest<DemandaAPI>(`/api/demandas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
}

export async function listarHistorico(
  demandaId: string
): Promise<HistoricoStatusAPI[]> {
  return apiRequest<HistoricoStatusAPI[]>(
    `/api/demandas/${demandaId}/historico`
  );
}

export async function excluirDemanda(
  demandaId: string
): Promise<void> {
  return apiRequest<void>(
    `/api/demandas/${demandaId}`,
    {
      method: "DELETE",
    }
  );
}
