export interface Cidadao {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  cdBairro: number;
  nomeBairro: string;
  dataCadastro: string;
}

// Corpo enviado no POST /cidadaos
export interface CidadaoNovo {
  nome: string;
  email: string;
  telefone?: string;
  cdBairro: number;
}
