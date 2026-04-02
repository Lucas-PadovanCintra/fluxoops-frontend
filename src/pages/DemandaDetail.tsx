import { useParams, useNavigate } from "react-router-dom";
import { useDemandas } from "@/contexts/DemandasContext";
import { StatusBadge, PrioridadeBadge } from "@/components/demandas/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Trash2, Send, History } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Status } from "@/types/demanda";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const statusOptions: Status[] = ["Aberta", "Em andamento", "Bloqueada", "Concluída"];

export default function DemandaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { demandas, deleteDemanda, addComentario, changeStatus } = useDemandas();
  const [novoComentario, setNovoComentario] = useState("");

  const demanda = demandas.find((d) => d.id === id);
  if (!demanda) {
    return (
      <div className="text-center py-16">
        <p className="text-lg font-medium text-muted-foreground">Demanda não encontrada</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/demandas")}>Voltar</Button>
      </div>
    );
  }

  const handleDelete = () => {
    deleteDemanda(demanda.id);
    navigate("/demandas");
  };

  const handleAddComentario = () => {
    if (!novoComentario.trim()) return;
    addComentario(demanda.id, novoComentario.trim());
    setNovoComentario("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
        <ArrowLeft className="w-4 h-4" />Voltar
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{demanda.titulo}</h1>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={demanda.status} />
            <PrioridadeBadge prioridade={demanda.prioridade} />
            <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs text-muted-foreground">{demanda.categoria}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={demanda.status} onValueChange={(v) => changeStatus(demanda.id, v as Status)}>
            <SelectTrigger className="w-[170px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {statusOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon"><Trash2 className="w-4 h-4" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir demanda?</AlertDialogTitle>
                <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Descrição</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{demanda.descricao || "Sem descrição."}</p>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t text-sm">
            <div><span className="text-muted-foreground">Criador:</span> <span className="font-medium ml-1">{demanda.criador.nome}</span></div>
            <div><span className="text-muted-foreground">Responsável:</span> <span className="font-medium ml-1">{demanda.responsavel?.nome || "—"}</span></div>
            <div><span className="text-muted-foreground">Criado em:</span> <span className="ml-1">{format(new Date(demanda.criado_em), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span></div>
            <div><span className="text-muted-foreground">Atualizado em:</span> <span className="ml-1">{format(new Date(demanda.atualizado_em), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><History className="w-4 h-4" />Histórico de Status</CardTitle>
        </CardHeader>
        <CardContent>
          {demanda.historico.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum histórico.</p>
          ) : (
            <div className="space-y-3">
              {demanda.historico.map((h) => (
                <div key={h.id} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-medium">{h.alterado_por.nome}</span>
                    {h.status_anterior ? (
                      <span className="text-muted-foreground"> alterou de <span className="font-medium">{h.status_anterior}</span> para <span className="font-medium">{h.status_novo}</span></span>
                    ) : (
                      <span className="text-muted-foreground"> criou como <span className="font-medium">{h.status_novo}</span></span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{format(new Date(h.alterado_em), "dd/MM HH:mm")}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Comentários ({demanda.comentarios.length})</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {demanda.comentarios.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">
                {c.autor.nome.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{c.autor.nome}</span>
                  <span className="text-xs text-muted-foreground">{format(new Date(c.criado_em), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{c.texto}</p>
              </div>
            </div>
          ))}

          <div className="flex gap-2 pt-2 border-t">
            <Textarea
              placeholder="Escreva um comentário..."
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <Button onClick={handleAddComentario} disabled={!novoComentario.trim()} className="gap-2">
            <Send className="w-4 h-4" />Enviar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
