import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDemandas } from "@/contexts/DemandasContext";
import { DemandaCard } from "@/components/demandas/DemandaCard";
import { DemandaFilters } from "@/components/demandas/DemandaFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DemandasList() {
  const { demandas } = useDemandas();
  const [busca, setBusca] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [prioridadeFilter, setPrioridadeFilter] = useState("all");
  const [categoriaFilter, setCategoriaFilter] = useState("all");

  const filtered = useMemo(() => {
    return demandas.filter((d) => {
      if (busca && !d.titulo.toLowerCase().includes(busca.toLowerCase()) && !d.descricao.toLowerCase().includes(busca.toLowerCase())) return false;
      if (statusFilter !== "all" && d.status !== statusFilter) return false;
      if (prioridadeFilter !== "all" && d.prioridade !== prioridadeFilter) return false;
      if (categoriaFilter !== "all" && d.categoria !== categoriaFilter) return false;
      return true;
    });
  }, [demandas, busca, statusFilter, prioridadeFilter, categoriaFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Demandas</h1>
          <p className="text-muted-foreground text-sm">{filtered.length} demanda{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <Button asChild>
          <Link to="/demandas/nova"><Plus className="w-4 h-4 mr-2" />Nova Demanda</Link>
        </Button>
      </div>

      <DemandaFilters
        busca={busca} setBusca={setBusca}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        prioridadeFilter={prioridadeFilter} setPrioridadeFilter={setPrioridadeFilter}
        categoriaFilter={categoriaFilter} setCategoriaFilter={setCategoriaFilter}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">Nenhuma demanda encontrada</p>
          <p className="text-sm mt-1">Tente ajustar os filtros ou crie uma nova demanda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d) => <DemandaCard key={d.id} demanda={d} />)}
        </div>
      )}
    </div>
  );
}
