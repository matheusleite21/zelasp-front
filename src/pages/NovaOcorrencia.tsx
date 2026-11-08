import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router";
import Botao, { BotaoLink } from "../components/Botao";
import CampoFormulario, { classeCampo } from "../components/CampoFormulario";
import Carregando from "../components/Carregando";
import MensagemErro from "../components/MensagemErro";
import { useCidadaoAtivo } from "../contexts/CidadaoAtivoContext";
import { ErroRequisicao } from "../services/api";
import { listarBairros, listarCategorias } from "../services/catalogo";
import { registrarOcorrencia } from "../services/ocorrencias";
import type { Bairro, Categoria } from "../types/catalogo";
import type { Ocorrencia } from "../types/ocorrencia";

type FormOcorrencia = { cdCategoria: string; cdBairro: string; titulo: string; endereco: string; descricao: string };

// Registro de ocorrência (POST /ocorrencias), com o aviso de duplicidade (409 da RN1)
export default function NovaOcorrencia() {
  const { cidadaoAtivo } = useCidadaoAtivo();
  const boasVindas = (useLocation().state as { boasVindas?: string } | null)?.boasVindas;
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [bairros, setBairros] = useState<Bairro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarga, setErroCarga] = useState<string | null>(null);
  const [erroEnvio, setErroEnvio] = useState<{ mensagem: string; duplicada: boolean } | null>(null);
  const [criada, setCriada] = useState<Ocorrencia | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormOcorrencia>();

  function buscar() {
    Promise.all([listarCategorias(), listarBairros()])
      .then(([c, b]) => { setCategorias(c); setBairros(b); setErroCarga(null); })
      .catch((e: Error) => setErroCarga(e.message))
      .finally(() => setCarregando(false));
  }
  useEffect(buscar, []);

  function tentarDeNovo() {
    setCarregando(true);
    buscar();
  }

  if (!cidadaoAtivo) {
    return (
      <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-3xl font-extrabold text-zela-900">Registrar ocorrência</h1>
        <p className="mt-3 text-slate-600">Para registrar e acompanhar um problema, faça seu cadastro. Leva menos de um minuto.</p>
        <div className="mt-6"><BotaoLink para="/cadastro">Fazer cadastro</BotaoLink></div>
      </section>
    );
  }

  async function enviar(dados: FormOcorrencia) {
    setErroEnvio(null);
    try {
      const ocorrencia = await registrarOcorrencia({
        cdCidadao: cidadaoAtivo!.id,
        cdCategoria: Number(dados.cdCategoria),
        cdBairro: Number(dados.cdBairro),
        titulo: dados.titulo.trim(),
        endereco: dados.endereco.trim(),
        descricao: dados.descricao.trim() || undefined,
      });
      setCriada(ocorrencia);
      reset();
    } catch (e) {
      const duplicada = e instanceof ErroRequisicao && e.status === 409;
      setErroEnvio({ mensagem: (e as Error).message, duplicada });
    }
  }

  if (criada) {
    return (
      <section role="status" className="mx-auto max-w-xl rounded-2xl border border-zela-100 bg-zela-50 p-8 text-center">
        <p className="text-5xl" aria-hidden="true">✅</p>
        <h1 className="mt-2 text-3xl font-extrabold text-zela-900">Ocorrência registrada!</h1>
        <p className="mt-3 text-slate-700">“{criada.titulo}” recebeu o código <b>{criada.id}</b>. A equipe da prefeitura já pode vê-la na fila de triagem.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <BotaoLink para={`/ocorrencias/${criada.id}`}>Acompanhar</BotaoLink>
          <Botao variante="secundario" onClick={() => setCriada(null)}>Registrar outra</Botao>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="text-4xl font-extrabold text-zela-900">Registrar ocorrência</h1>
      <p className="mt-2 text-slate-600">Olá, {cidadaoAtivo.nome.split(" ")[0]}! Conte o que você encontrou e onde.</p>
      {boasVindas && <p role="status" className="mt-4 rounded-lg bg-zela-50 p-3 font-medium text-zela-900">{boasVindas}</p>}

      {carregando && <Carregando texto="Carregando categorias e bairros..." />}
      {erroCarga && <div className="mt-6"><MensagemErro mensagem={erroCarga} aoTentarNovamente={tentarDeNovo} /></div>}

      {erroEnvio && (
        <div role="alert" className={`mt-6 rounded-xl border p-5 ${erroEnvio.duplicada ? "border-amber-300 bg-amber-50 text-amber-900" : "border-red-200 bg-red-50 text-red-800"}`}>
          <p className="font-semibold">{erroEnvio.duplicada ? "Esse problema já foi registrado" : "Não foi possível registrar"}</p>
          <p className="mt-1">
            {erroEnvio.duplicada
              ? "Já existe uma ocorrência aberta deste tipo nesse endereço. Acompanhe a existente: assim a prefeitura não recebe o mesmo pedido duas vezes."
              : erroEnvio.mensagem}
          </p>
          {erroEnvio.duplicada && <Link to="/ocorrencias" className="mt-2 inline-block font-semibold underline">Ver ocorrências abertas</Link>}
        </div>
      )}

      {!carregando && !erroCarga && (
        <form onSubmit={handleSubmit(enviar)} noValidate className="mt-6 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <CampoFormulario id="cdCategoria" rotulo="Tipo de problema" erro={errors.cdCategoria?.message} obrigatorio>
              <select id="cdCategoria" defaultValue="" className={classeCampo} aria-invalid={!!errors.cdCategoria} {...register("cdCategoria", { required: "Escolha o tipo de problema." })}>
                <option value="" disabled>Escolha…</option>
                {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome} (prazo: {c.prazoDias} dias)</option>)}
              </select>
            </CampoFormulario>
            <CampoFormulario id="cdBairro" rotulo="Bairro" erro={errors.cdBairro?.message} obrigatorio>
              <select id="cdBairro" defaultValue="" className={classeCampo} aria-invalid={!!errors.cdBairro} {...register("cdBairro", { required: "Escolha o bairro." })}>
                <option value="" disabled>Escolha…</option>
                {bairros.map((b) => <option key={b.id} value={b.id}>{b.nome}</option>)}
              </select>
            </CampoFormulario>
          </div>
          <CampoFormulario id="titulo" rotulo="Título" dica="Resuma em poucas palavras. Ex.: Buraco grande na faixa da direita" erro={errors.titulo?.message} obrigatorio>
            <input id="titulo" className={classeCampo} aria-invalid={!!errors.titulo}
              {...register("titulo", { required: "Escreva um título.", minLength: { value: 5, message: "O título precisa ter pelo menos 5 caracteres." }, maxLength: { value: 100, message: "Use no máximo 100 caracteres." } })} />
          </CampoFormulario>
          <CampoFormulario id="endereco" rotulo="Endereço ou ponto de referência" dica="Ex.: Rua da Mooca, 1500, em frente à padaria" erro={errors.endereco?.message} obrigatorio>
            <input id="endereco" className={classeCampo} aria-invalid={!!errors.endereco}
              {...register("endereco", { required: "Informe onde está o problema.", maxLength: { value: 150, message: "Use no máximo 150 caracteres." } })} />
          </CampoFormulario>
          <CampoFormulario id="descricao" rotulo="Descrição (opcional)" erro={errors.descricao?.message}>
            <textarea id="descricao" rows={4} className={classeCampo} aria-invalid={!!errors.descricao}
              {...register("descricao", { maxLength: { value: 500, message: "Use no máximo 500 caracteres." } })} />
          </CampoFormulario>
          <Botao type="submit" disabled={isSubmitting}>{isSubmitting ? "Registrando..." : "Registrar ocorrência"}</Botao>
        </form>
      )}
    </section>
  );
}
