import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import BadgeStatus, { BadgePrioridade } from "../components/BadgeStatus";
import Carregando from "../components/Carregando";
import ListaVazia from "../components/ListaVazia";
import MensagemErro from "../components/MensagemErro";
import { ErroRequisicao } from "../services/api";
import { listarCategorias } from "../services/catalogo";
import { diasEmAberto, formatarData } from "../services/formatacao";
import { buscarOcorrencia, listarAtualizacoes } from "../services/ocorrencias";
import type { Atualizacao, Ocorrencia } from "../types/ocorrencia";

// Rota dinâmica /ocorrencias/:id: detalhe + linha do tempo (rota aninhada da API)
export default function OcorrenciaDetalhe() {
  const { id = "" } = useParams();
  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
  const [atualizacoes, setAtualizacoes] = useState<Atualizacao[]>([]);
  const [prazo, setPrazo] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<{ mensagem: string; naoExiste: boolean } | null>(null);

  function buscar() {
    Promise.all([buscarOcorrencia(Number(id)), listarAtualizacoes(Number(id)), listarCategorias()])
      .then(([o, a, categorias]) => {
        setOcorrencia(o);
        setAtualizacoes(a);
        setErro(null);
        setPrazo(categorias.find((c) => c.id === o.cdCategoria)?.prazoDias ?? null);
      })
      .catch((e: Error) => setErro({ mensagem: e.message, naoExiste: e instanceof ErroRequisicao && (e.status === 404 || e.status === 400) }))
      .finally(() => setCarregando(false));
  }
  useEffect(buscar, [id]);

  function tentarDeNovo() {
    setCarregando(true);
    buscar();
  }

  if (carregando) return <Carregando texto="Carregando ocorrência..." />;
  if (erro?.naoExiste) {
    return <ListaVazia titulo="Ocorrência não encontrada" texto={`Não existe ocorrência com o código ${id}.`} acao={<Link className="font-semibold text-zela-700 underline" to="/ocorrencias">Ver todas as ocorrências</Link>} />;
  }
  if (erro || !ocorrencia) return <MensagemErro mensagem={erro?.mensagem ?? "Erro ao carregar."} aoTentarNovamente={tentarDeNovo} />;

  const dias = diasEmAberto(ocorrencia.dataAbertura, ocorrencia.dataResolucao);
  const encerrada = ocorrencia.status === "RESOLVIDA" || ocorrencia.status === "CANCELADA";
  const atrasada = prazo !== null && !encerrada && dias > prazo;

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link to="/ocorrencias" className="text-sm text-slate-600 underline">← Todas as ocorrências</Link>
      <header className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap gap-2">
          <BadgeStatus valor={ocorrencia.status} />
          {!encerrada && <BadgePrioridade valor={ocorrencia.prioridade} />}
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-zela-900">{ocorrencia.titulo}</h1>
        <p className="mt-1 text-slate-500">Código {ocorrencia.id}</p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div><dt className="text-sm text-slate-500">Tipo</dt><dd className="font-medium">{ocorrencia.nomeCategoria}{prazo !== null && ` · prazo de ${prazo} dias`}</dd></div>
          <div><dt className="text-sm text-slate-500">Local</dt><dd className="font-medium">{ocorrencia.endereco} · {ocorrencia.nomeBairro}</dd></div>
          <div><dt className="text-sm text-slate-500">Aberta em</dt><dd className="font-medium">{formatarData(ocorrencia.dataAbertura)}</dd></div>
          <div>
            <dt className="text-sm text-slate-500">{encerrada ? "Encerrada em" : "Tempo em aberto"}</dt>
            <dd className={`font-medium ${atrasada ? "text-red-700" : ""}`}>
              {encerrada ? formatarData(ocorrencia.dataResolucao) || "—" : `${dias} dia(s)${atrasada ? ` · ${dias - prazo!} além do prazo` : ""}`}
            </dd>
          </div>
        </dl>
        {ocorrencia.descricao && <p className="mt-5 text-slate-700">{ocorrencia.descricao}</p>}
      </header>

      <section aria-labelledby="linha-do-tempo" className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 id="linha-do-tempo" className="text-2xl font-bold text-zela-900">Linha do tempo</h2>
        <ol className="mt-5 flex flex-col gap-5 border-l-4 border-zela-100 pl-5">
          <li>
            <p className="text-sm text-slate-500">{formatarData(ocorrencia.dataAbertura)}</p>
            <p className="font-medium">Ocorrência registrada pelo morador</p>
          </li>
          {atualizacoes.map((a) => (
            <li key={a.id}>
              <p className="text-sm text-slate-500">{formatarData(a.dataAtualizacao)} · {a.responsavel}</p>
              <div className="mt-1"><BadgeStatus valor={a.status} /></div>
              <p className="mt-1 text-slate-800">{a.mensagem}</p>
            </li>
          ))}
        </ol>
        {atualizacoes.length === 0 && <p className="mt-4 text-slate-600">A prefeitura ainda não publicou atualizações. Você verá cada passo aqui.</p>}
      </section>
    </article>
  );
}
