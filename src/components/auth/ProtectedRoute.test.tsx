import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";

describe("ProtectedRoute", () => {
  it("redireciona usuários não autenticados para o login", () => {
    const authSimulado = {
      usuario: null,
      carregando: false,
      erroAutenticacao: null,
      login: vi.fn(),
      cadastro: vi.fn(),
      logout: vi.fn(),
    };

    render(
      <AuthContext.Provider value={authSimulado}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/login" element={<h1>Página de login</h1>} />

            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={<h1>Dashboard protegido</h1>}
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Página de login")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard protegido")).not.toBeInTheDocument();
  });

  it("permite acesso ao dashboard para usuários autenticados", () => {
    const authSimulado = {
      usuario: {
        id: 1,
        nome: "Usuário Teste",
        email: "teste@fluxoops.com",
      },
      carregando: false,
      erroAutenticacao: null,
      login: vi.fn(),
      cadastro: vi.fn(),
      logout: vi.fn(),
    };

    render(
      <AuthContext.Provider value={authSimulado}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/login" element={<h1>Página de login</h1>} />

            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={<h1>Dashboard protegido</h1>}
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Dashboard protegido")).toBeInTheDocument();
    expect(screen.queryByText("Página de login")).not.toBeInTheDocument();
  });

  it("exibe mensagem enquanto verifica a autenticação", () => {
    const authSimulado = {
      usuario: null,
      carregando: true,
      erroAutenticacao: null,
      login: vi.fn(),
      cadastro: vi.fn(),
      logout: vi.fn(),
    };

    render(
      <AuthContext.Provider value={authSimulado}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/login" element={<h1>Página de login</h1>} />

            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={<h1>Dashboard protegido</h1>}
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(
      screen.getByText("Verificando autenticação...")
    ).toBeInTheDocument();

    expect(screen.queryByText("Página de login")).not.toBeInTheDocument();

    expect(screen.queryByText("Dashboard protegido")).not.toBeInTheDocument();
  });

  it("exibe mensagem quando ocorre erro na autenticação", () => {
    const authSimulado = {
      usuario: null,
      carregando: false,
      erroAutenticacao: "Erro de conexão com o servidor.",
      login: vi.fn(),
      cadastro: vi.fn(),
      logout: vi.fn(),
    };

    render(
      <AuthContext.Provider value={authSimulado}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/login" element={<h1>Página de login</h1>} />

            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={<h1>Dashboard protegido</h1>}
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(
      screen.getByText("Não foi possível verificar sua sessão")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Erro de conexão com o servidor.")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Tentar novamente" })
    ).toBeInTheDocument();

    expect(screen.queryByText("Página de login")).not.toBeInTheDocument();

    expect(screen.queryByText("Dashboard protegido")).not.toBeInTheDocument();
  });
});
