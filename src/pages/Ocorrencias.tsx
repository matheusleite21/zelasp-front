import { useEffect, useState } from "react";
import { BotaoLink } from "../components/Botao";
import CardOcorrencia from "../components/CardOcorrencia";
import { classeCampo } from "../components/CampoFormulario";
import Carregando from "../components/Carregando";
import ListaVazia from "../components/ListaVazia";
import MensagemErro from "../components/MensagemErro";
import { rotuloStatus } from "../services/formatacao";
import { listarOcorrencias } from "../services/ocorrencias";
import type { Ocorrencia, StatusOcorrencia } from "../types/ocorrencia";

const STATUS: StatusOcorrencia[] = ["ABERTA", "EM_ANDAMENTO", "RESOLVIDA", "CANCELADA"];

// Lista de ocorrências (GET /ocorrencias) com filtros de status e bairro
export default function Ocorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [bairro, setBairro] = useState("");

  function buscar() {
    listarOcorrencias()
      .then((lista) => { setOcorrencias(lista); setErro(null); })
      .catch((e: Error) => setErro(e.message))
      .finally(() => setCarregando(false));
  }
  useEffect(buscar, []);

  function tentarDeNovo() {
    setCarregando(true);
    buscar();
  }

  const bairros = [...new Set(ocorrencias.map((o) => o.nomeBairro))].sort();
  const filtradas = ocorrencias.filter((o) => (!status || o.status === status) && (!bairro || o.nomeBairro === bairro));

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-zela-900">Ocorrências</h1>
          <p className="mt-1 text-slate-600">Problemas registrados pelos moradores e o andamento de cada um.</p>
        </div>
        <BotaoLink para="/ocorrencias/nova">+ Registrar ocorrência</BotaoLink>
      </div>

      <form className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} aria-label="Filtros">
        <label className="flex flex-col gap-1 font-medium">
          Status
          <select className={classeCampo} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos</option>
            {STATUS.map((s) => <option key={s} value={s}>{rotuloStatus[s]}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 font-medium">
          Bairro
          <select className={classeCampo} value={bairro} onChange={(e) => setBairro(e.target.value)}>
            <option value="">Todos</option>
            {bairros.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
      </form>

      <div className="mt-6">
        {carregando && <Carregando texto="Buscando ocorrências..." />}
        {!carregando && erro && <MensagemErro mensagem={erro} aoTentarNovamente={tentarDeNovo} />}
        {!carregando && !erro && ocorrencias.length === 0 && (
          <ListaVazia titulo="Nenhuma ocorrência ainda" texto="Seja o primeiro a registrar um problema na sua rua." acao={<BotaoLink para="/ocorrencias/nova">Registrar ocorrência</BotaoLink>} />
        )}
        {!carregando && !erro && ocorrencias.length > 0 && filtradas.length === 0 && (
          <ListaVazia titulo="Nada com esses filtros" texto="Tente outro status ou outro bairro." />
        )}
        {!carregando && !erro && filtradas.length > 0 && (
          <>
            <p className="mb-3 text-sm text-slate-600" aria-live="polite">{filtradas.length} ocorrência(s)</p>
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtradas.map((o) => <CardOcorrencia key={o.id} ocorrencia={o} />)}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
