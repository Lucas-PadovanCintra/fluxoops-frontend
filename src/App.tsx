import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { DemandasProvider } from "@/contexts/DemandasContext";
import { AuthProvider } from "@/contexts/AuthContext";
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const DemandasList = lazy(() => import("@/pages/DemandasList"));
const DemandaDetail = lazy(() => import("@/pages/DemandaDetail"));
const NovaDemanda = lazy(() => import("@/pages/NovaDemanda"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const Cadastro = lazy(() => import("@/pages/Cadastro"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <DemandasProvider>
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Carregando...
                  </p>
                </div>
              }
            >
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/demandas" element={<DemandasList />} />
                    <Route path="/demandas/nova" element={<NovaDemanda />} />
                    <Route path="/demandas/:id/editar" element={<NovaDemanda />} />
                    <Route path="/demandas/:id" element={<DemandaDetail />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </DemandasProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
