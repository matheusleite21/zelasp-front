import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CidadaoAtivoProvider } from "./contexts/CidadaoAtivoProvider";

// Estrutura compartilhada: Header e Footer fixos e o Outlet com a página da rota atual
export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CidadaoAtivoProvider>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:p-2">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CidadaoAtivoProvider>
  );
}
