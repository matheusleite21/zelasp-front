import { useEffect, useState } from "react";
import { BotaoLink } from "../components/Botao";
import { listarOcorrencias } from "../services/ocorrencias";
import type { Ocorrencia } from "../types/ocorrencia";

const passos = [
  { numero: "1", titulo: "Registre em 1 minuto", texto: "Escolha a categoria, o bairro e o endereço. Se alguém já registrou o mesmo problema, avisamos." },
  { numero: "2", titulo: "A prefeitura prioriza", texto: "A equipe da subprefeitura vê uma fila organizada por gravidade, número de moradores afetados e tempo em aberto." },
  { numero: "3", titulo: "Acompanhe tudo", texto: "Cada passo aparece na linha do tempo pública da ocorrência, até ela ser resolvida." },
];

// Página inicial: apresenta a solução e mostra números reais vindos da API
export default function Home() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[] | null>(null);

  useEffect(() => {
    // Se a API falhar, a página continua útil: os números só não aparecem
    listarOcorrencias().then(setOcorrencias).catch(() => setOcorrencias(null));
  }, []);

  const abertas = ocorrencias?.filter((o) => o.status === "ABERTA" || o.status === "EM_ANDAMENTO").length;
  const resolvidas = ocorrencias?.filter((o) => o.status === "RESOLVIDA").length;

  return (
    <div className="flex flex-col gap-14">
      <section className="grid items-center gap-8 rounded-3xl bg-zela-700 px-6 py-12 text-white md:grid-cols-2 md:px-12">
        <div>
          <p className="font-semibold text-sol-300">Zeladoria colaborativa para São Paulo</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight md:text-5xl">Viu um problema na rua? Registre e acompanhe até o fim.</h1>
          <p className="mt-4 text-lg text-zela-100">
            Buraco, poste, árvore, entulho, calçada ou placa: o ZelaSP organiza os pedidos para a prefeitura e mostra a você cada passo do atendimento.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BotaoLink para="/ocorrencias/nova" variante="destaque">Registrar ocorrência</BotaoLink>
            <BotaoLink para="/ocorrencias" variante="claro">Ver ocorrências</BotaoLink>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-4" aria-live="polite">
          <div className="rounded-2xl bg-white/10 p-5">
            <dt className="text-sm text-zela-100">Em atendimento agora</dt>
            <dd className="text-4xl font-extrabold">{abertas ?? "—"}</dd>
          </div>
          <div className="rounded-2xl bg-white/10 p-5">
            <dt className="text-sm text-zela-100">Já resolvidas</dt>
            <dd className="text-4xl font-extrabold">{resolvidas ?? "—"}</dd>
          </div>
          <div className="col-span-2 rounded-2xl bg-sol-500 p-5 text-zela-900">
            <dt className="text-sm font-semibold">Em São Paulo</dt>
            <dd className="text-lg font-bold">Mais de 85 mil pedidos de zeladoria chegam ao 156 a cada trimestre.</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="como-funciona">
        <h2 id="como-funciona" className="text-3xl font-bold text-zela-900">Como funciona</h2>
        <ol className="mt-6 grid gap-5 md:grid-cols-3">
          {passos.map((p) => (
            <li key={p.numero} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sol-500 text-lg font-extrabold text-zela-900">{p.numero}</span>
              <h3 className="mt-4 text-xl font-semibold text-zela-900">{p.titulo}</h3>
              <p className="mt-2 text-slate-600">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
