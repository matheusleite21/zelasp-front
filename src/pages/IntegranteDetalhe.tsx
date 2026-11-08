import { Link, useParams } from "react-router";
import ListaVazia from "../components/ListaVazia";
import { buscarIntegrante } from "../data/integrantes";

// Rota dinâmica: o parâmetro :rm da URL escolhe o integrante
export default function IntegranteDetalhe() {
  const { rm = "" } = useParams();
  const integrante = buscarIntegrante(rm);

  if (!integrante) {
    return <ListaVazia titulo="Integrante não encontrado" texto={`Não existe integrante com o RM ${rm}.`} acao={<Link className="font-semibold text-zela-700 underline" to="/integrantes">Ver integrantes</Link>} />;
  }

  return (
    <article className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white p-8 text-center">
      <img src={integrante.foto} alt={`Foto de ${integrante.nome}`} className="h-36 w-36 rounded-full object-cover" />
      <h1 className="text-3xl font-extrabold text-zela-900">{integrante.nome}</h1>
      <p className="text-slate-600">RM {integrante.rm} · {integrante.turma}</p>
      <p className="font-semibold text-zela-700">{integrante.papel}</p>
      <p className="text-slate-700">{integrante.descricao}</p>
      <div className="flex gap-4">
        <a href={integrante.github} target="_blank" rel="noreferrer" className="font-semibold text-zela-700 underline">GitHub</a>
        <a href={integrante.linkedin} target="_blank" rel="noreferrer" className="font-semibold text-zela-700 underline">LinkedIn</a>
      </div>
      <Link to="/integrantes" className="text-sm text-slate-500 underline">← Voltar aos integrantes</Link>
    </article>
  );
}
