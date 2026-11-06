import type { Cidadao, CidadaoNovo } from "../types/cidadao";
import { requisitar } from "./api";

export function cadastrarCidadao(dados: CidadaoNovo) {
  return requisitar<Cidadao>("/cidadaos", { method: "POST", body: JSON.stringify(dados) });
}

export function buscarCidadao(id: number) {
  return requisitar<Cidadao>(`/cidadaos/${id}`);
}
