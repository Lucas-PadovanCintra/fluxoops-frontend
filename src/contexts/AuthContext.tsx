import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Usuario } from "@/types/demanda";
import {
  login as loginApi,
  cadastro as cadastroApi,
} from "@/services/auth";
import type { LoginResponse } from "@/services/auth";
import { apiRequest, ApiError } from "@/services/api";

interface AuthContextType {
  usuario: Usuario | null;
  carregando: boolean;
  erroAutenticacao: string | null;
  login: (email: string, senha: string) => Promise<void>;
  cadastro: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroAutenticacao, setErroAutenticacao] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function verificarSessao() {
      const token = sessionStorage.getItem("fluxoops_token");

      if (!token) {
        if (ativo) {
          setCarregando(false);
        }
        return;
      }

      try {
        const usuarioAtual = await apiRequest<Usuario>("/api/auth/me");

        if (ativo) {
          setUsuario(usuarioAtual);
          setErroAutenticacao(null);
        }
      } catch (error) {
        if (!ativo) return;

        setUsuario(null);

        if (error instanceof ApiError && error.status === 401) {
          sessionStorage.removeItem("fluxoops_token");
          setErroAutenticacao(null);
        } else {
          setErroAutenticacao(
            "Não foi possível verificar sua sessão. Verifique a conexão com o servidor."
          );
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    verificarSessao();

    return () => {
      ativo = false;
    };
  }, []);

  function autenticar(resposta: LoginResponse): void {
    sessionStorage.setItem("fluxoops_token", resposta.access_token);
    setUsuario(resposta.usuario);
    setErroAutenticacao(null);
  }

  async function login(email: string, senha: string): Promise<void> {
    const resposta = await loginApi(email, senha);
    autenticar(resposta);
  }

  async function cadastro(
    nome: string,
    email: string,
    senha: string
  ): Promise<void> {
    const resposta = await cadastroApi(nome, email, senha);
    autenticar(resposta);
  }

  function logout(): void {
    sessionStorage.removeItem("fluxoops_token");
    setUsuario(null);
    setErroAutenticacao(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        erroAutenticacao,
        login,
        cadastro,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}
