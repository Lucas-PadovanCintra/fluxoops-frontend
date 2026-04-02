import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Status, Prioridade, Categoria } from "@/types/demanda";

interface FiltersProps {
  busca: string;
  setBusca: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  prioridadeFilter: string;
  setPrioridadeFilter: (v: string) => void;
  categoriaFilter: string;
  setCategoriaFilter: (v: string) => void;
}

const statusOptions: Status[] = ["Aberta", "Em andamento", "Bloqueada", "Concluída"];
const prioridadeOptions: Prioridade[] = ["Baixa", "Média", "Alta", "Crítica"];
const categoriaOptions: Categoria[] = ["Bug", "Feature", "Melhoria", "Suporte", "Infraestrutura", "Documentação"];

export function DemandaFilters({
  busca, setBusca, statusFilter, setStatusFilter, prioridadeFilter, setPrioridadeFilter, categoriaFilter, setCategoriaFilter,
}: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar demandas..." value={busca} onChange={(e) => setBusca(e.target.value)} className="pl-9" />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          {statusOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={prioridadeFilter} onValueChange={setPrioridadeFilter}>
        <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Prioridade" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {prioridadeOptions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
        <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Categoria" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {categoriaOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
