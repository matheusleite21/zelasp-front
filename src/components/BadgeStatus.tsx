import { rotuloStatus } from "../services/formatacao";
import type { Prioridade, StatusOcorrencia } from "../types/ocorrencia";

const corStatus: Record<StatusOcorrencia, string> = {
  ABERTA: "bg-sky-100 text-sky-900",
  EM_ANDAMENTO: "bg-amber-100 text-amber-900",
  RESOLVIDA: "bg-zela-100 text-zela-900",
  CANCELADA: "bg-slate-200 text-slate-700",
};

const prioridade: Record<Prioridade, { texto: string; cor: string }> = {
  ALTA: { texto: "Prioridade alta", cor: "bg-red-100 text-red-800" },
  MEDIA: { texto: "Prioridade média", cor: "bg-yellow-100 text-yellow-900" },
  BAIXA: { texto: "Prioridade baixa", cor: "bg-slate-100 text-slate-700" },
};

const base = "inline-block rounded-full px-3 py-1 text-xs font-semibold";

// Etiqueta colorida do status (o texto acompanha a cor, sem depender só dela)
export default function BadgeStatus({ valor }: { valor: StatusOcorrencia }) {
  return <span className={`${base} ${corStatus[valor]}`}>{rotuloStatus[valor]}</span>;
}

export function BadgePrioridade({ valor }: { valor: Prioridade }) {
  return <span className={`${base} ${prioridade[valor].cor}`}>{prioridade[valor].texto}</span>;
}
