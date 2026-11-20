import { apiRequest } from "./api";
import type { ComentarioAPI } from "@/types/api";

export async function listarComentarios(
  demandaId: string
): Promise<ComentarioAPI[]> {
  return apiRequest<ComentarioAPI[]>(
    `/api/comentarios/${demandaId}`
  );
}

export async function criarComentario(
  demandaId: string,
  texto: string
): Promise<ComentarioAPI> {
  return apiRequest<ComentarioAPI>(
    "/api/comentarios/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        demanda_id: demandaId,
        texto,
      }),
    }
  );
}
