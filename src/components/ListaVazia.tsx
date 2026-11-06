import type { ReactNode } from "react";

type ListaVaziaProps = { titulo: string; texto: string; acao?: ReactNode };

// Estado de "nenhum dado": explica o motivo e oferece um próximo passo
export default function ListaVazia({ titulo, texto, acao }: ListaVaziaProps) {
  return (
    <div className="rounded-xl border-2 border-dashed border-zela-100 p-8 text-center">
      <p className="text-lg font-semibold text-zela-900">{titulo}</p>
      <p className="mt-1 text-slate-600">{texto}</p>
      {acao && <div className="mt-5">{acao}</div>}
    </div>
  );
}
