import { Categoria, Prioridade } from "@/types/demanda";

const REGRAS_CATEGORIA: Record<Categoria, string[]> = {
  Bug: ["bug", "erro", "falha", "crash", "quebrou", "não funciona", "defeito", "problema"],
  Feature: ["nova funcionalidade", "feature", "implementar", "criar", "adicionar", "novo"],
  Melhoria: ["melhorar", "otimizar", "refatorar", "performance", "ajustar", "aprimorar"],
  Suporte: ["dúvida", "ajuda", "suporte", "como fazer", "orientação", "treinamento"],
  Infraestrutura: ["servidor", "deploy", "infraestrutura", "banco de dados", "devops", "ci/cd"],
  Documentação: ["documentação", "readme", "docs", "manual", "wiki", "guia"],
};

const REGRAS_PRIORIDADE: Record<Prioridade, string[]> = {
  Crítica: ["urgente", "crítico", "produção caiu", "bloqueante", "emergência", "imediato"],
  Alta: ["importante", "alta prioridade", "impacto grande", "cliente reclamando", "prazo curto"],
  Média: ["normal", "médio", "quando possível", "backlog"],
  Baixa: ["baixa", "pode esperar", "nice to have", "futuro", "sem pressa"],
};

export function sugerirCategoriaEPrioridade(texto: string): {
  categoria: Categoria;
  prioridade: Prioridade;
} {
  const lower = texto.toLowerCase();

  let categoria: Categoria = "Feature";
  for (const [cat, palavras] of Object.entries(REGRAS_CATEGORIA)) {
    if (palavras.some((p) => lower.includes(p))) {
      categoria = cat as Categoria;
      break;
    }
  }

  let prioridade: Prioridade = "Média";
  for (const [pri, palavras] of Object.entries(REGRAS_PRIORIDADE)) {
    if (palavras.some((p) => lower.includes(p))) {
      prioridade = pri as Prioridade;
      break;
    }
  }

  return { categoria, prioridade };
}
