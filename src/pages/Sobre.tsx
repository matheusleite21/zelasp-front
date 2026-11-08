const tecnologias = ["React + TypeScript + Tailwind (este site)", "API REST em Java Spring Boot", "Banco de dados Oracle", "Painel da prefeitura em Python", "Modelos de IA treinados com dados abertos do SP156"];

// Página institucional: problema, solução, ODS e tecnologias
export default function Sobre() {
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="text-4xl font-extrabold text-zela-900">Sobre o ZelaSP</h1>
        <p className="mt-3 text-lg text-slate-600">Uma CitizenTech criada para a Global Solution 2026/2 da FIAP.</p>
      </header>
      <section>
        <h2 className="text-2xl font-bold text-zela-900">O problema</h2>
        <p className="mt-2 text-slate-700">
          Só no 2º trimestre de 2026, o SP156 recebeu 85.624 pedidos de buraco, iluminação, poda, entulho, calçada e sinalização (dados abertos da Prefeitura de São Paulo). Muitos pedidos se repetem, o cidadão não sabe quando o problema será resolvido e quase 1 em cada 4 pedidos passa do prazo de referência, com grande diferença entre as subprefeituras.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-zela-900">A solução</h2>
        <p className="mt-2 text-slate-700">
          O cidadão registra o problema e acompanha uma linha do tempo pública. Se o mesmo problema já foi registrado, o ZelaSP avisa e evita a duplicidade. A prefeitura atende por um painel de triagem que prioriza o que é mais urgente.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-zela-900">Objetivos de Desenvolvimento Sustentável</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          <li className="rounded-xl bg-zela-50 p-4"><b>ODS 11</b>: cidades e comunidades sustentáveis, com espaços públicos mais seguros e bem cuidados.</li>
          <li className="rounded-xl bg-zela-50 p-4"><b>ODS 10</b>: redução das desigualdades, comparando o atendimento entre centro e periferia.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-zela-900">Tecnologias</h2>
        <ul className="mt-2 list-disc pl-6 text-slate-700">
          {tecnologias.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>
    </article>
  );
}
