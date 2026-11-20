import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DemandasProvider } from "@/contexts/DemandasContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import DemandasList from "@/pages/DemandasList";
import DemandaDetail from "@/pages/DemandaDetail";
import NovaDemanda from "@/pages/NovaDemanda";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <DemandasProvider>
            <Routes>
              <Route path="/login" element={<Login />} />

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
          </DemandasProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
