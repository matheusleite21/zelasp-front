import type { Atualizacao, Ocorrencia, OcorrenciaNova } from "../types/ocorrencia";
import { requisitar } from "./api";

export function listarOcorrencias() {
  return requisitar<Ocorrencia[]>("/ocorrencias");
}

export function buscarOcorrencia(id: number) {
  return requisitar<Ocorrencia>(`/ocorrencias/${id}`);
}

export function registrarOcorrencia(dados: OcorrenciaNova) {
  return requisitar<Ocorrencia>("/ocorrencias", { method: "POST", body: JSON.stringify(dados) });
}

export function listarAtualizacoes(idOcorrencia: number) {
  return requisitar<Atualizacao[]>(`/ocorrencias/${idOcorrencia}/atualizacoes`);
}
