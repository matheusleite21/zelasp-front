// Listas somente leitura usadas nos selects dos formulários
export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
  prazoDias: number;
}

export interface Bairro {
  id: number;
  nome: string;
  subprefeitura: string;
}
