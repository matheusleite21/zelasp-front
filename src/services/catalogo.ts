import type { Bairro, Categoria } from "../types/catalogo";
import { requisitar } from "./api";

export function listarCategorias() {
  return requisitar<Categoria[]>("/categorias");
}

export function listarBairros() {
  return requisitar<Bairro[]>("/bairros");
}
