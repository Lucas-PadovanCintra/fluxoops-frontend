import { useDemandas } from "@/contexts/DemandasContext";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DemandaCard } from "@/components/demandas/DemandaCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ListTodo, Clock, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

const STATUS_COLORS = ["hsl(199, 89%, 48%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)", "hsl(142, 76%, 36%)"];
const PRIORIDADE_COLORS = ["hsl(215, 16%, 47%)", "hsl(199, 89%, 48%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)"];

export default function Dashboard() {
  const { demandas, carregando, erro } = useDemandas();

  if (carregando) {
    return (
      <div
        role="status"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <p className="text-muted-foreground">
          Carregando dados do dashboard...
        </p>
      </div>
    );
  }

  if (erro) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-destructive/30 bg-destructive/5 p-6"
      >
        <h2 className="text-lg font-semibold text-destructive">
          Erro ao carregar o dashboard
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {erro}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Verifique a conexão com o servidor e atualize a página.
        </p>
      </div>
    );
  }

  const porStatus = [
    { name: "Aberta", value: demandas.filter((d) => d.status === "Aberta").length },
    { name: "Em andamento", value: demandas.filter((d) => d.status === "Em andamento").length },
    { name: "Bloqueada", value: demandas.filter((d) => d.status === "Bloqueada").length },
    { name: "Concluída", value: demandas.filter((d) => d.status === "Concluída").length },
  ];

  const porPrioridade = [
    { name: "Baixa", value: demandas.filter((d) => d.prioridade === "Baixa").length },
    { name: "Média", value: demandas.filter((d) => d.prioridade === "Média").length },
    { name: "Alta", value: demandas.filter((d) => d.prioridade === "Alta").length },
    { name: "Crítica", value: demandas.filter((d) => d.prioridade === "Crítica").length },
  ];

  const recentes = [...demandas].sort((a, b) => new Date(b.atualizado_em).getTime() - new Date(a.atualizado_em).getTime()).slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Visão geral das demandas da equipe</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total de Demandas" value={demandas.length} icon={ListTodo} iconClassName="bg-primary/10 text-primary" />
        <StatsCard title="Em Andamento" value={porStatus[1].value} icon={Clock} iconClassName="bg-warning/10 text-warning" />
        <StatsCard title="Bloqueadas" value={porStatus[2].value} icon={AlertTriangle} iconClassName="bg-destructive/10 text-destructive" />
        <StatsCard title="Concluídas" value={porStatus[3].value} icon={CheckCircle2} iconClassName="bg-success/10 text-success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Demandas por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={porStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {porStatus.map((_, i) => <Cell key={i} fill={STATUS_COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Demandas por Prioridade</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={porPrioridade}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {porPrioridade.map((_, i) => <Cell key={i} fill={PRIORIDADE_COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-base font-semibold">Atividade Recente</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentes.map((d) => <DemandaCard key={d.id} demanda={d} />)}
        </div>
      </div>
    </div>
  );
}
