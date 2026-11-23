import { createContext } from "react";
import type { Usuario } from "@/types/demanda";

export interface AuthContextType {
  usuario: Usuario | null;
  carregando: boolean;
  erroAutenticacao: string | null;
  login: (email: string, senha: string) => Promise<void>;
  cadastro: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
