import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute() {
  const { usuario, carregando, erroAutenticacao } = useAuth();

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Verificando autenticação...
        </p>
      </div>
    );
  }

  if (erroAutenticacao) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border bg-card p-6 text-center shadow-sm">
          <h2 className="text-xl font-semibold">
            Não foi possível verificar sua sessão
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            {erroAutenticacao}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Verifique se o servidor está funcionando e tente novamente.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
