import type { ErroApi } from "../types/api";

// Endereço da API Java publicada; definido no .env local e nas variáveis da Vercel
const API_URL = import.meta.env.VITE_API_URL;

// Erro com o status HTTP, para a tela tratar casos como 404 e 409
export class ErroRequisicao extends Error {
  readonly status: number;

  constructor(mensagem: string, status: number) {
    super(mensagem);
    this.status = status;
  }
}

// Função base usada por todos os serviços: monta a URL, faz o fetch,
// confere response.ok e converte o JSON no tipo esperado.
export async function requisitar<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  let resposta: Response;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      headers: opcoes.body ? { "Content-Type": "application/json" } : undefined,
    });
  } catch {
    // fetch só rejeita quando não há resposta: sem internet ou API fora do ar
    throw new ErroRequisicao(
      "Não foi possível conectar ao ZelaSP. Verifique sua internet e tente novamente.",
      0,
    );
  }

  if (!resposta.ok) {
    throw new ErroRequisicao(await lerMensagemDeErro(resposta), resposta.status);
  }
  if (resposta.status === 204) {
    return undefined as T; // DELETE não tem corpo
  }
  return (await resposta.json()) as T;
}

// Usa a mensagem enviada pela API; se houver erro de campo, mostra o primeiro
async function lerMensagemDeErro(resposta: Response): Promise<string> {
  try {
    const erro = (await resposta.json()) as ErroApi;
    const primeiroCampo = erro.campos ? Object.values(erro.campos)[0] : undefined;
    return primeiroCampo ?? erro.mensagem;
  } catch {
    return `O servidor respondeu com erro (${resposta.status}). Tente novamente em instantes.`;
  }
}
