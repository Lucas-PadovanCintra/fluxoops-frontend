import { Demanda, Usuario, DashboardData } from "@/types/demanda";

export const usuarios: Usuario[] = [
  { id: "1", nome: "Admin FluxoOps", email: "admin@fluxoops.com", is_admin: true },
  { id: "2", nome: "Maria Silva", email: "maria@fluxoops.com", is_admin: false },
  { id: "3", nome: "João Santos", email: "joao@fluxoops.com", is_admin: false },
];

export const mockDemandas: Demanda[] = [
  {
    id: "1", titulo: "Corrigir erro no login", descricao: "Usuários reportam erro 500 ao tentar logar. O problema acontece quando o token JWT expira e o refresh não funciona corretamente.",
    categoria: "Bug", prioridade: "Crítica", status: "Em andamento",
    responsavel: usuarios[1], criador: usuarios[0],
    criado_em: "2026-03-28T10:00:00Z", atualizado_em: "2026-04-01T14:30:00Z",
    comentarios: [
      { id: "c1", texto: "Identifiquei o problema no middleware de autenticação.", autor: usuarios[1], criado_em: "2026-03-29T09:00:00Z" },
      { id: "c2", texto: "Fix aplicado no branch hotfix/login. Aguardando review.", autor: usuarios[1], criado_em: "2026-04-01T14:30:00Z" },
    ],
    historico: [
      { id: "h1", status_anterior: null, status_novo: "Aberta", alterado_por: usuarios[0], alterado_em: "2026-03-28T10:00:00Z" },
      { id: "h2", status_anterior: "Aberta", status_novo: "Em andamento", alterado_por: usuarios[1], alterado_em: "2026-03-29T08:00:00Z" },
    ],
  },
  {
    id: "2", titulo: "Implementar exportação CSV", descricao: "Adicionar botão para exportar relatórios em CSV no dashboard.",
    categoria: "Feature", prioridade: "Média", status: "Aberta",
    responsavel: usuarios[2], criador: usuarios[0],
    criado_em: "2026-03-30T08:00:00Z", atualizado_em: "2026-03-30T08:00:00Z",
    comentarios: [], historico: [
      { id: "h3", status_anterior: null, status_novo: "Aberta", alterado_por: usuarios[0], alterado_em: "2026-03-30T08:00:00Z" },
    ],
  },
  {
    id: "3", titulo: "Otimizar queries do dashboard", descricao: "Dashboard está lento com muitos dados. Precisa otimizar as queries SQL e adicionar índices.",
    categoria: "Melhoria", prioridade: "Alta", status: "Aberta",
    responsavel: usuarios[1], criador: usuarios[2],
    criado_em: "2026-03-31T09:00:00Z", atualizado_em: "2026-03-31T09:00:00Z",
    comentarios: [
      { id: "c3", texto: "Vou analisar o EXPLAIN das queries principais.", autor: usuarios[1], criado_em: "2026-03-31T10:00:00Z" },
    ],
    historico: [
      { id: "h4", status_anterior: null, status_novo: "Aberta", alterado_por: usuarios[2], alterado_em: "2026-03-31T09:00:00Z" },
    ],
  },
  {
    id: "4", titulo: "Configurar CI/CD", descricao: "Criar pipeline de deploy automatizado com GitHub Actions.",
    categoria: "Infraestrutura", prioridade: "Média", status: "Bloqueada",
    responsavel: null, criador: usuarios[0],
    criado_em: "2026-03-25T14:00:00Z", atualizado_em: "2026-03-27T11:00:00Z",
    comentarios: [
      { id: "c4", texto: "Bloqueado: aguardando acesso ao servidor de staging.", autor: usuarios[0], criado_em: "2026-03-27T11:00:00Z" },
    ],
    historico: [
      { id: "h5", status_anterior: null, status_novo: "Aberta", alterado_por: usuarios[0], alterado_em: "2026-03-25T14:00:00Z" },
      { id: "h6", status_anterior: "Aberta", status_novo: "Bloqueada", alterado_por: usuarios[0], alterado_em: "2026-03-27T11:00:00Z" },
    ],
  },
  {
    id: "5", titulo: "Escrever documentação da API", descricao: "Documentar todos os endpoints REST com exemplos.",
    categoria: "Documentação", prioridade: "Baixa", status: "Concluída",
    responsavel: usuarios[2], criador: usuarios[1],
    criado_em: "2026-03-20T10:00:00Z", atualizado_em: "2026-03-26T16:00:00Z",
    comentarios: [], historico: [
      { id: "h7", status_anterior: null, status_novo: "Aberta", alterado_por: usuarios[1], alterado_em: "2026-03-20T10:00:00Z" },
      { id: "h8", status_anterior: "Aberta", status_novo: "Em andamento", alterado_por: usuarios[2], alterado_em: "2026-03-22T09:00:00Z" },
      { id: "h9", status_anterior: "Em andamento", status_novo: "Concluída", alterado_por: usuarios[2], alterado_em: "2026-03-26T16:00:00Z" },
    ],
  },
  {
    id: "6", titulo: "Dúvida sobre permissões de admin", descricao: "Como configurar permissões granulares para administradores?",
    categoria: "Suporte", prioridade: "Baixa", status: "Concluída",
    responsavel: usuarios[0], criador: usuarios[2],
    criado_em: "2026-03-22T11:00:00Z", atualizado_em: "2026-03-23T09:00:00Z",
    comentarios: [
      { id: "c5", texto: "As permissões são baseadas em roles. Veja a documentação.", autor: usuarios[0], criado_em: "2026-03-23T09:00:00Z" },
    ],
    historico: [
      { id: "h10", status_anterior: null, status_novo: "Aberta", alterado_por: usuarios[2], alterado_em: "2026-03-22T11:00:00Z" },
      { id: "h11", status_anterior: "Aberta", status_novo: "Concluída", alterado_por: usuarios[0], alterado_em: "2026-03-23T09:00:00Z" },
    ],
  },
  {
    id: "7", titulo: "Adicionar notificações por email", descricao: "Enviar notificações por email quando uma demanda mudar de status.",
    categoria: "Feature", prioridade: "Alta", status: "Em andamento",
    responsavel: usuarios[2], criador: usuarios[0],
    criado_em: "2026-03-29T15:00:00Z", atualizado_em: "2026-04-01T10:00:00Z",
    comentarios: [], historico: [
      { id: "h12", status_anterior: null, status_novo: "Aberta", alterado_por: usuarios[0], alterado_em: "2026-03-29T15:00:00Z" },
      { id: "h13", status_anterior: "Aberta", status_novo: "Em andamento", alterado_por: usuarios[2], alterado_em: "2026-04-01T10:00:00Z" },
    ],
  },
  {
    id: "8", titulo: "Migrar banco para versão 15 do Postgres", descricao: "Atualizar o PostgreSQL de 13 para 15 para aproveitar melhorias de performance.",
    categoria: "Infraestrutura", prioridade: "Média", status: "Aberta",
    responsavel: usuarios[0], criador: usuarios[1],
    criado_em: "2026-04-01T08:00:00Z", atualizado_em: "2026-04-01T08:00:00Z",
    comentarios: [], historico: [
      { id: "h14", status_anterior: null, status_novo: "Aberta", alterado_por: usuarios[1], alterado_em: "2026-04-01T08:00:00Z" },
    ],
  },
];

export const mockDashboardData: DashboardData = {
  total_demandas: mockDemandas.length,
  por_status: {
    "Aberta": mockDemandas.filter(d => d.status === "Aberta").length,
    "Em andamento": mockDemandas.filter(d => d.status === "Em andamento").length,
    "Bloqueada": mockDemandas.filter(d => d.status === "Bloqueada").length,
    "Concluída": mockDemandas.filter(d => d.status === "Concluída").length,
  },
  por_prioridade: {
    "Baixa": mockDemandas.filter(d => d.prioridade === "Baixa").length,
    "Média": mockDemandas.filter(d => d.prioridade === "Média").length,
    "Alta": mockDemandas.filter(d => d.prioridade === "Alta").length,
    "Crítica": mockDemandas.filter(d => d.prioridade === "Crítica").length,
  },
};
