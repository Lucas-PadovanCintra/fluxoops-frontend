
import { apiRequest } from "./api";
import type { Usuario } from "@/types/demanda";

interface LoginResponse {
  access_token: string;
  token_type: string;
  usuario: Usuario;
}

export async function login(
  email: string,
  senha: string
): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });
}
