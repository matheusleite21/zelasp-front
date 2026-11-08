import { Link } from "react-router";
import { integrantes } from "../data/integrantes";

// Lista dos integrantes; cada card leva à rota dinâmica /integrantes/:rm
export default function Integrantes() {
  return (
    <section>
      <h1 className="text-4xl font-extrabold text-zela-900">Integrantes</h1>
      <p className="mt-2 text-slate-600">Equipe ZelaSP · turma 1TDSPO · FIAP</p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {integrantes.map((i) => (
          <li key={i.rm}>
            <Link to={`/integrantes/${i.rm}`} className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-zela-600">
              <img src={i.foto} alt={`Foto de ${i.nome}`} className="h-24 w-24 shrink-0 rounded-full object-cover" />
              <div>
                <h2 className="text-xl font-semibold text-zela-900">{i.nome}</h2>
                <p className="text-slate-600">RM {i.rm} · {i.turma}</p>
                <p className="mt-1 text-sm font-medium text-zela-700">{i.papel}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
