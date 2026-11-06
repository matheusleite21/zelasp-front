import { Link, isRouteErrorResponse, useRouteError } from "react-router";

// Página para rotas inexistentes ou erros inesperados de renderização
export default function Erro() {
  const erro = useRouteError();
  const naoEncontrada = isRouteErrorResponse(erro) && erro.status === 404;
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl font-extrabold text-zela-700">{naoEncontrada ? "404" : "Ops!"}</p>
      <h1 className="text-2xl font-bold text-zela-900">{naoEncontrada ? "Esta página não existe." : "Algo inesperado aconteceu."}</h1>
      <p className="text-slate-600">Confira o endereço ou volte para a página inicial.</p>
      <Link to="/" className="rounded-lg bg-zela-700 px-5 py-2.5 font-semibold text-white">Ir para o início</Link>
    </main>
  );
}
