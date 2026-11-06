import { createContext, useContext } from "react";
import type { Cidadao } from "../types/cidadao";

// Cidadão que está usando o site agora: o Header e as páginas de registro leem esse valor
export type CidadaoAtivo = Pick<Cidadao, "id" | "nome">;

export type CidadaoAtivoContextValue = {
  cidadaoAtivo: CidadaoAtivo | null;
  entrar: (cidadao: CidadaoAtivo) => void;
  sair: () => void;
};

export const CidadaoAtivoContext = createContext<CidadaoAtivoContextValue | undefined>(undefined);

// Hook personalizado: única porta de entrada para ler o contexto
export function useCidadaoAtivo() {
  const context = useContext(CidadaoAtivoContext);
  if (context === undefined) {
    throw new Error("useCidadaoAtivo deve ser usado dentro de CidadaoAtivoProvider");
  }
  return context;
}
