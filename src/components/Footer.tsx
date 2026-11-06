import { Link } from "react-router";

// Rodapé com links institucionais e identificação do projeto
export default function Footer() {
  return (
    <footer className="mt-12 bg-zela-900 text-zela-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold">ZelaSP</p>
          <p className="mt-1 text-sm text-zela-100">Zeladoria colaborativa para São Paulo.</p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-1 text-sm">
            <li><Link className="hover:underline" to="/sobre">Sobre</Link></li>
            <li><Link className="hover:underline" to="/faq">FAQ</Link></li>
            <li><Link className="hover:underline" to="/integrantes">Integrantes</Link></li>
            <li><Link className="hover:underline" to="/contato">Contato</Link></li>
          </ul>
        </nav>
        <p className="text-sm text-zela-100">
          Global Solution 2026/2 · CitizenTech · FIAP 1TDSPO. Situação de risco imediato (árvore caindo, fio partido): ligue 199, Defesa Civil.
        </p>
      </div>
    </footer>
  );
}
