import { useEffect, useState, type ReactNode } from "react";
import { CidadaoAtivoContext, type CidadaoAtivo } from "./CidadaoAtivoContext";

const CHAVE_LOCAL = "zelasp-cidadao-ativo";

// localStorage pode falhar (modo privado ou bloqueado): nesse caso começa sem cidadão
function lerCidadaoSalvo(): CidadaoAtivo | null {
  try {
    const texto = localStorage.getItem(CHAVE_LOCAL);
    return texto ? (JSON.parse(texto) as CidadaoAtivo) : null;
  } catch {
    return null;
  }
}

// Fornece o cidadão ativo para toda a árvore abaixo dele
export function CidadaoAtivoProvider({ children }: { children: ReactNode }) {
  const [cidadaoAtivo, setCidadaoAtivo] = useState<CidadaoAtivo | null>(lerCidadaoSalvo);

  // Mantém o cidadão salvo para quando o site for aberto novamente
  useEffect(() => {
    try {
      if (cidadaoAtivo) {
        localStorage.setItem(CHAVE_LOCAL, JSON.stringify(cidadaoAtivo));
      } else {
        localStorage.removeItem(CHAVE_LOCAL);
      }
    } catch {
      // sem armazenamento disponível: vale só nesta visita
    }
  }, [cidadaoAtivo]);

  return (
    <CidadaoAtivoContext
      value={{
        cidadaoAtivo,
        entrar: (c) => setCidadaoAtivo({ id: c.id, nome: c.nome }),
        sair: () => setCidadaoAtivo(null),
      }}
    >
      {children}
    </CidadaoAtivoContext>
  );
}
