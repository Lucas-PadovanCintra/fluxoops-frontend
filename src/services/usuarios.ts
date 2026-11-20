
import { apiRequest } from "./api";
import type { Usuario } from "@/types/demanda";

export async function listarUsuarios(): Promise<Usuario[]> {
  return apiRequest<Usuario[]>("/api/auth/usuarios");
}
