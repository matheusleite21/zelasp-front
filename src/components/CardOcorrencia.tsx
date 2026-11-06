import { Link } from "react-router";
import { diasEmAberto, formatarData } from "../services/formatacao";
import type { Ocorrencia } from "../types/ocorrencia";
import BadgeStatus, { BadgePrioridade } from "./BadgeStatus";

// Resumo de uma ocorrência na lista; o card inteiro leva ao detalhe
export default function CardOcorrencia({ ocorrencia }: { ocorrencia: Ocorrencia }) {
  const encerrada = ocorrencia.status === "RESOLVIDA" || ocorrencia.status === "CANCELADA";
  return (
    <li>
      <Link
        to={`/ocorrencias/${ocorrencia.id}`}
        className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-zela-600 hover:shadow-md"
      >
        <div className="flex flex-wrap items-center gap-2">
          <BadgeStatus valor={ocorrencia.status} />
          {!encerrada && <BadgePrioridade valor={ocorrencia.prioridade} />}
        </div>
        <h3 className="text-lg font-semibold text-zela-900">{ocorrencia.titulo}</h3>
        <p className="text-sm text-slate-600">
          {ocorrencia.nomeCategoria} · {ocorrencia.endereco} · {ocorrencia.nomeBairro}
        </p>
        <p className="mt-auto text-sm text-slate-500">
          Aberta em {formatarData(ocorrencia.dataAbertura)}
          {encerrada ? "" : ` · há ${diasEmAberto(ocorrencia.dataAbertura)} dia(s)`}
        </p>
      </Link>
    </li>
  );
}
