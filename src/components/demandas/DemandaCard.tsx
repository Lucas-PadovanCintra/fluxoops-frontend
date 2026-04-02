import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge, PrioridadeBadge } from "./StatusBadge";
import { Demanda } from "@/types/demanda";
import { MessageSquare, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function DemandaCard({ demanda }: { demanda: Demanda }) {
  return (
    <Link to={`/demandas/${demanda.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2">{demanda.titulo}</h3>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">{demanda.descricao}</p>

          <div className="flex flex-wrap gap-1.5">
            <StatusBadge status={demanda.status} />
            <PrioridadeBadge prioridade={demanda.prioridade} />
            <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
              {demanda.categoria}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDistanceToNow(new Date(demanda.criado_em), { addSuffix: true, locale: ptBR })}
            </div>
            <div className="flex items-center gap-3">
              {demanda.comentarios.length > 0 && (
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {demanda.comentarios.length}
                </span>
              )}
              {demanda.responsavel && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {demanda.responsavel.nome.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
