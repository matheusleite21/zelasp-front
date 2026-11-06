import type { ReactNode } from "react";

type CampoFormularioProps = {
  id: string;
  rotulo: string;
  erro?: string;
  dica?: string;
  obrigatorio?: boolean;
  children: ReactNode;
};

// Rótulo + campo + mensagem de erro, ligados por id (acessível para leitores de tela)
export default function CampoFormulario({ id, rotulo, erro, dica, obrigatorio, children }: CampoFormularioProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium text-slate-800">
        {rotulo} {obrigatorio && <span className="text-red-700" aria-hidden="true">*</span>}
      </label>
      {children}
      {dica && !erro && <p id={`${id}-dica`} className="text-sm text-slate-500">{dica}</p>}
      {erro && (
        <p id={`${id}-erro`} role="alert" className="text-sm font-medium text-red-700">
          {erro}
        </p>
      )}
    </div>
  );
}

// Classe visual comum para input, select e textarea
export const classeCampo =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-zela-700 aria-[invalid=true]:border-red-600";
