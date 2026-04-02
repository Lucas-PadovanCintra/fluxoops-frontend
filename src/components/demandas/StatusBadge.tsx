import { Badge } from "@/components/ui/badge";
import { Status, Prioridade } from "@/types/demanda";
import { cn } from "@/lib/utils";

const statusStyles: Record<Status, string> = {
  Aberta: "bg-info/15 text-info border-info/30",
  "Em andamento": "bg-warning/15 text-warning border-warning/30",
  Bloqueada: "bg-destructive/15 text-destructive border-destructive/30",
  Concluída: "bg-success/15 text-success border-success/30",
};

const prioridadeStyles: Record<Prioridade, string> = {
  Baixa: "bg-muted text-muted-foreground border-border",
  Média: "bg-info/15 text-info border-info/30",
  Alta: "bg-warning/15 text-warning border-warning/30",
  Crítica: "bg-destructive/15 text-destructive border-destructive/30",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", statusStyles[status])}>
      {status}
    </Badge>
  );
}

export function PrioridadeBadge({ prioridade }: { prioridade: Prioridade }) {
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", prioridadeStyles[prioridade])}>
      {prioridade}
    </Badge>
  );
}
