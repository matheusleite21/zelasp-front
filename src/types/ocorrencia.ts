export type StatusOcorrencia = "ABERTA" | "EM_ANDAMENTO" | "RESOLVIDA" | "CANCELADA";
export type Prioridade = "BAIXA" | "MEDIA" | "ALTA";

export interface Ocorrencia {
  id: number;
  titulo: string;
  descricao?: string;
  endereco: string;
  status: StatusOcorrencia;
  prioridade: Prioridade;
  dataAbertura: string;
  dataResolucao?: string;
  cdCidadao: number;
  nomeCidadao: string;
  cdCategoria: number;
  nomeCategoria: string;
  cdBairro: number;
  nomeBairro: string;
}

// Corpo enviado no POST /ocorrencias (o status nasce ABERTA na API)
export interface OcorrenciaNova {
  cdCidadao: number;
  cdCategoria: number;
  cdBairro: number;
  titulo: string;
  descricao?: string;
  endereco: string;
}

// Item da linha do tempo (GET /ocorrencias/{id}/atualizacoes)
export interface Atualizacao {
  id: number;
  cdOcorrencia: number;
  mensagem: string;
  status: StatusOcorrencia;
  responsavel: string;
  dataAtualizacao: string;
}
