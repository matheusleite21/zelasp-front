import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router";

type Variante = "primario" | "secundario" | "destaque" | "claro";

const estilos: Record<Variante, string> = {
  primario: "bg-zela-700 text-white hover:bg-zela-900",
  secundario: "border-2 border-zela-700 text-zela-700 hover:bg-zela-50",
  // para fundos verdes (ex.: topo da Home)
  destaque: "bg-sol-500 text-zela-900 hover:bg-sol-300",
  claro: "border-2 border-white text-white hover:bg-white/10",
};
const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

type BotaoProps = ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante };

// Botão padrão do site (usado nos formulários e nas telas de erro)
export default function Botao({ variante = "primario", className = "", ...props }: BotaoProps) {
  return <button className={`${base} ${estilos[variante]} ${className}`} {...props} />;
}

type BotaoLinkProps = { para: string; variante?: Variante; children: React.ReactNode };

// Mesmo visual do Botao, mas navega para outra rota
export function BotaoLink({ para, variante = "primario", children }: BotaoLinkProps) {
  return (
    <Link to={para} className={`${base} ${estilos[variante]}`}>
      {children}
    </Link>
  );
}
