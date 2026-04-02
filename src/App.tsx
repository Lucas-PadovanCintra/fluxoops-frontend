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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DemandasProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/demandas" element={<DemandasList />} />
              <Route path="/demandas/nova" element={<NovaDemanda />} />
              <Route path="/demandas/:id" element={<DemandaDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DemandasProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
