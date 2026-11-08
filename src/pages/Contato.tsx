import { useState } from "react";
import { useForm } from "react-hook-form";
import Botao from "../components/Botao";
import CampoFormulario, { classeCampo } from "../components/CampoFormulario";

type FormContato = { nome: string; email: string; assunto: string; mensagem: string };

const EMAIL_EQUIPE = "rm573416@fiap.com.br,rm570701@fiap.com.br";

// Formulário de contato validado; ao final abre o e-mail do usuário já preenchido
export default function Contato() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormContato>();
  const [linkEmail, setLinkEmail] = useState<string | null>(null);

  function enviar(dados: FormContato) {
    const corpo = `${dados.mensagem}\n\n${dados.nome} (${dados.email})`;
    setLinkEmail(`mailto:${EMAIL_EQUIPE}?subject=${encodeURIComponent(`[ZelaSP] ${dados.assunto}`)}&body=${encodeURIComponent(corpo)}`);
    reset();
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="text-4xl font-extrabold text-zela-900">Contato</h1>
      <p className="mt-2 text-slate-600">Dúvidas, sugestões ou interesse em levar o ZelaSP para a sua cidade? Fale com a equipe.</p>

      {linkEmail && (
        <div role="status" className="mt-6 rounded-xl border border-zela-100 bg-zela-50 p-5">
          <p className="font-semibold text-zela-900">Mensagem pronta!</p>
          <p className="mt-1 text-slate-700">Clique abaixo para enviá-la pelo seu aplicativo de e-mail.</p>
          <a href={linkEmail} className="mt-3 inline-block font-semibold text-zela-700 underline">Abrir meu e-mail</a>
        </div>
      )}

      <form onSubmit={handleSubmit(enviar)} noValidate className="mt-6 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6">
        <CampoFormulario id="nome" rotulo="Seu nome" erro={errors.nome?.message} obrigatorio>
          <input id="nome" className={classeCampo} aria-invalid={!!errors.nome}
            {...register("nome", { required: "Informe seu nome.", minLength: { value: 3, message: "O nome precisa ter pelo menos 3 letras." } })} />
        </CampoFormulario>
        <CampoFormulario id="email" rotulo="Seu e-mail" erro={errors.email?.message} obrigatorio>
          <input id="email" type="email" className={classeCampo} aria-invalid={!!errors.email}
            {...register("email", { required: "Informe seu e-mail.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Informe um e-mail válido, como nome@exemplo.com." } })} />
        </CampoFormulario>
        <CampoFormulario id="assunto" rotulo="Assunto" erro={errors.assunto?.message} obrigatorio>
          <select id="assunto" className={classeCampo} aria-invalid={!!errors.assunto} defaultValue="" {...register("assunto", { required: "Escolha um assunto." })}>
            <option value="" disabled>Escolha…</option>
            <option>Dúvida sobre o uso</option>
            <option>Sugestão</option>
            <option>Quero o ZelaSP na minha cidade</option>
          </select>
        </CampoFormulario>
        <CampoFormulario id="mensagem" rotulo="Mensagem" erro={errors.mensagem?.message} obrigatorio>
          <textarea id="mensagem" rows={5} className={classeCampo} aria-invalid={!!errors.mensagem}
            {...register("mensagem", { required: "Escreva sua mensagem.", minLength: { value: 10, message: "Escreva pelo menos 10 caracteres." } })} />
        </CampoFormulario>
        <Botao type="submit">Preparar mensagem</Botao>
      </form>
    </section>
  );
}
