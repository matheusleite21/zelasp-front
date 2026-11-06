import type { StatusOcorrencia } from "../types/ocorrencia";

// Funções de exibição usadas em várias telas

export function formatarData(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR");
}

// Dias entre a abertura e a resolução (ou até hoje, se ainda aberta)
export function diasEmAberto(abertura: string, resolucao?: string): number {
  const fim = resolucao ? new Date(resolucao) : new Date();
  const dias = (fim.getTime() - new Date(abertura).getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.floor(dias));
}

// Texto exibido para cada status da API
export const rotuloStatus: Record<StatusOcorrencia, string> = {
  ABERTA: "Aberta",
  EM_ANDAMENTO: "Em andamento",
  RESOLVIDA: "Resolvida",
  CANCELADA: "Cancelada",
};
