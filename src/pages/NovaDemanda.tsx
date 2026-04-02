import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDemandas } from "@/contexts/DemandasContext";
import { sugerirCategoriaEPrioridade } from "@/lib/sugestao";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Categoria, Prioridade, Status } from "@/types/demanda";
import { Lightbulb, Sparkles } from "lucide-react";
import { toast } from "sonner";

const categorias: Categoria[] = ["Bug", "Feature", "Melhoria", "Suporte", "Infraestrutura", "Documentação"];
const prioridades: Prioridade[] = ["Baixa", "Média", "Alta", "Crítica"];

export default function NovaDemanda() {
  const navigate = useNavigate();
  const { addDemanda, usuarios } = useDemandas();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("Feature");
  const [prioridade, setPrioridade] = useState<Prioridade>("Média");
  const [responsavelId, setResponsavelId] = useState<string>("");
  const [sugestao, setSugestao] = useState<{ categoria: Categoria; prioridade: Prioridade } | null>(null);

  useEffect(() => {
    const text = `${titulo} ${descricao}`.trim();
    if (text.length >= 5) {
      const s = sugerirCategoriaEPrioridade(text);
      setSugestao(s);
    } else {
      setSugestao(null);
    }
  }, [titulo, descricao]);

  const aplicarSugestao = () => {
    if (!sugestao) return;
    setCategoria(sugestao.categoria);
    setPrioridade(sugestao.prioridade);
    toast.success("Sugestão aplicada!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) { toast.error("Título é obrigatório"); return; }

    addDemanda({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria,
      prioridade,
      status: "Aberta" as Status,
      responsavel: responsavelId ? usuarios.find((u) => u.id === responsavelId) || null : null,
    });
    toast.success("Demanda criada com sucesso!");
    navigate("/demandas");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nova Demanda</h1>
        <p className="text-muted-foreground text-sm">Preencha os dados para criar uma nova demanda</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Informações</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input id="titulo" placeholder="Ex: Corrigir erro no login" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea id="descricao" placeholder="Descreva a demanda em detalhes..." value={descricao} onChange={(e) => setDescricao(e.target.value)} className="min-h-[120px]" />
            </div>
          </CardContent>
        </Card>

        {sugestao && (sugestao.categoria !== "Feature" || sugestao.prioridade !== "Média") && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sugestão inteligente</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Categoria: <span className="font-medium">{sugestao.categoria}</span> · Prioridade: <span className="font-medium">{sugestao.prioridade}</span>
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={aplicarSugestao} className="gap-1">
                  <Lightbulb className="w-3 h-3" />Aplicar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle className="text-base">Classificação</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={categoria} onValueChange={(v) => setCategoria(v as Categoria)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{categorias.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Prioridade</Label>
              <Select value={prioridade} onValueChange={(v) => setPrioridade(v as Prioridade)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{prioridades.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Responsável</Label>
              <Select value={responsavelId} onValueChange={setResponsavelId}>
                <SelectTrigger><SelectValue placeholder="Selecionar responsável" /></SelectTrigger>
                <SelectContent>
                  {usuarios.map((u) => <SelectItem key={u.id} value={u.id}>{u.nome}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancelar</Button>
          <Button type="submit">Criar Demanda</Button>
        </div>
      </form>
    </div>
  );
}
