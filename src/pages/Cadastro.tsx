import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Botao from "../components/Botao";
import CampoFormulario, { classeCampo } from "../components/CampoFormulario";
import MensagemErro from "../components/MensagemErro";
import { useCidadaoAtivo } from "../contexts/CidadaoAtivoContext";
import { listarBairros } from "../services/catalogo";
import { buscarCidadao, cadastrarCidadao } from "../services/cidadaos";
import type { Bairro } from "../types/catalogo";

type FormCadastro = { nome: string; email: string; telefone: string; cdBairro: string };

// Cadastro do cidadão (POST /cidadaos). Depois de cadastrar, ele vira o "cidadão ativo".
export default function Cadastro() {
  const navigate = useNavigate();
  const { entrar } = useCidadaoAtivo();
  const [bairros, setBairros] = useState<Bairro[]>([]);
  const [erroBairros, setErroBairros] = useState<string | null>(null);
  const [erroApi, setErroApi] = useState<string | null>(null);
  const [codigo, setCodigo] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormCadastro>();

  function carregarBairros() {
    listarBairros()
      .then((lista) => { setBairros(lista); setErroBairros(null); })
      .catch((e: Error) => setErroBairros(e.message));
  }
  useEffect(carregarBairros, []);

  async function cadastrar(dados: FormCadastro) {
    setErroApi(null);
    try {
      const cidadao = await cadastrarCidadao({
        nome: dados.nome.trim(),
        email: dados.email.trim(),
        telefone: dados.telefone.trim() || undefined,
        cdBairro: Number(dados.cdBairro),
      });
      entrar(cidadao);
      navigate("/ocorrencias/nova", { state: { boasVindas: `Cadastro feito! Seu código de cidadão é ${cidadao.id}.` } });
    } catch (e) {
      setErroApi((e as Error).message);
    }
  }

  async function entrarComCodigo() {
    setErroApi(null);
    try {
      const cidadao = await buscarCidadao(Number(codigo));
      entrar(cidadao);
      navigate("/ocorrencias/nova");
    } catch {
      setErroApi(`Não encontramos o cidadão de código ${codigo}. Confira o número ou faça o cadastro.`);
    }
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="text-4xl font-extrabold text-zela-900">Cadastre-se</h1>
      <p className="mt-2 text-slate-600">Com o cadastro você registra ocorrências e acompanha o atendimento. Seu nome não aparece para outras pessoas.</p>

      {erroBairros && <div className="mt-6"><MensagemErro mensagem={erroBairros} aoTentarNovamente={carregarBairros} /></div>}
      {erroApi && <div className="mt-6"><MensagemErro mensagem={erroApi} /></div>}

      <form onSubmit={handleSubmit(cadastrar)} noValidate className="mt-6 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6">
        <CampoFormulario id="nome" rotulo="Nome completo" erro={errors.nome?.message} obrigatorio>
          <input id="nome" autoComplete="name" className={classeCampo} aria-invalid={!!errors.nome}
            {...register("nome", { required: "Informe seu nome.", minLength: { value: 3, message: "O nome precisa ter pelo menos 3 letras." }, maxLength: { value: 100, message: "Use no máximo 100 caracteres." } })} />
        </CampoFormulario>
        <CampoFormulario id="email" rotulo="E-mail" erro={errors.email?.message} obrigatorio>
          <input id="email" type="email" autoComplete="email" className={classeCampo} aria-invalid={!!errors.email}
            {...register("email", { required: "Informe seu e-mail.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Informe um e-mail válido, como nome@exemplo.com." } })} />
        </CampoFormulario>
        <CampoFormulario id="telefone" rotulo="Celular (opcional)" dica="Só números, com DDD. Ex.: 11987654321" erro={errors.telefone?.message}>
          <input id="telefone" inputMode="numeric" autoComplete="tel" className={classeCampo} aria-invalid={!!errors.telefone}
            {...register("telefone", { pattern: { value: /^\d{10,11}$/, message: "Use 10 ou 11 números, com DDD." } })} />
        </CampoFormulario>
        <CampoFormulario id="cdBairro" rotulo="Seu bairro" erro={errors.cdBairro?.message} obrigatorio>
          <select id="cdBairro" defaultValue="" className={classeCampo} aria-invalid={!!errors.cdBairro} {...register("cdBairro", { required: "Escolha seu bairro." })}>
            <option value="" disabled>{bairros.length ? "Escolha…" : "Carregando bairros…"}</option>
            {bairros.map((b) => <option key={b.id} value={b.id}>{b.nome} ({b.subprefeitura})</option>)}
          </select>
        </CampoFormulario>
        <Botao type="submit" disabled={isSubmitting}>{isSubmitting ? "Cadastrando..." : "Criar cadastro"}</Botao>
      </form>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-zela-900">Já tem cadastro?</h2>
        <p className="text-sm text-slate-600">Informe o código de cidadão que você recebeu.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <label htmlFor="codigo" className="sr-only">Código de cidadão</label>
          <input id="codigo" inputMode="numeric" value={codigo} onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
            className={`${classeCampo} max-w-40`} placeholder="Ex.: 12" />
          <Botao type="button" variante="secundario" disabled={!codigo} onClick={entrarComCodigo}>Entrar</Botao>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">Prefere só olhar? <Link to="/ocorrencias" className="underline">Veja as ocorrências</Link>.</p>
    </section>
  );
}
