import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useCidadaoAtivo } from "../contexts/CidadaoAtivoContext";

const links = [
  { para: "/", texto: "Início" },
  { para: "/ocorrencias", texto: "Ocorrências" },
  { para: "/ocorrencias/nova", texto: "Registrar" },
  { para: "/sobre", texto: "Sobre" },
  { para: "/faq", texto: "FAQ" },
  { para: "/integrantes", texto: "Integrantes" },
  { para: "/contato", texto: "Contato" },
];

// Cabeçalho fixo com menu horizontal (desktop) e menu hambúrguer (celular)
export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { cidadaoAtivo, sair } = useCidadaoAtivo();
  const fechar = () => setMenuAberto(false);

  const classeLink = ({ isActive }: { isActive: boolean }) =>
    `block rounded-md px-3 py-2 font-medium ${isActive ? "bg-zela-50 text-zela-700" : "text-slate-700 hover:text-zela-700"}`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" onClick={fechar} className="flex items-center gap-2" aria-label="ZelaSP, página inicial">
          <img src="/favicon.svg" alt="" className="h-9 w-9" />
          <span className="text-2xl font-extrabold tracking-tight text-zela-700">ZelaSP</span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.para}>
                <NavLink to={l.para} end className={classeLink}>
                  {l.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {cidadaoAtivo ? (
            <>
              <span className="text-sm text-slate-600">Olá, <b>{cidadaoAtivo.nome.split(" ")[0]}</b></span>
              <button onClick={sair} className="text-sm font-medium text-zela-700 underline">Sair</button>
            </>
          ) : (
            <Link to="/cadastro" className="rounded-lg bg-zela-700 px-4 py-2 text-sm font-semibold text-white hover:bg-zela-900">
              Cadastrar-se
            </Link>
          )}
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-zela-700 lg:hidden"
          aria-expanded={menuAberto}
          aria-controls="menu-celular"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            {menuAberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuAberto && (
        <nav id="menu-celular" aria-label="Menu do celular" className="border-t border-slate-200 bg-white px-4 pb-4 lg:hidden">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.para}>
                <NavLink to={l.para} end onClick={fechar} className={classeLink}>
                  {l.texto}
                </NavLink>
              </li>
            ))}
          </ul>
          {cidadaoAtivo ? (
            <button onClick={() => { sair(); fechar(); }} className="mt-2 w-full rounded-lg border border-zela-700 py-2 font-semibold text-zela-700">
              Sair ({cidadaoAtivo.nome.split(" ")[0]})
            </button>
          ) : (
            <Link to="/cadastro" onClick={fechar} className="mt-2 block rounded-lg bg-zela-700 py-2 text-center font-semibold text-white">
              Cadastrar-se
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
