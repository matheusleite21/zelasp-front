import { useState } from "react";
import { perguntas } from "../data/faq";

// Perguntas frequentes em acordeão: só uma resposta aberta por vez
export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-extrabold text-zela-900">Perguntas frequentes</h1>
      <ul className="mt-6 flex flex-col gap-3">
        {perguntas.map((item, indice) => {
          const estaAberta = aberta === indice;
          return (
            <li key={item.pergunta} className="rounded-xl border border-slate-200 bg-white">
              <h2>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-lg font-semibold text-zela-900"
                  aria-expanded={estaAberta}
                  aria-controls={`resposta-${indice}`}
                  onClick={() => setAberta(estaAberta ? null : indice)}
                >
                  {item.pergunta}
                  <span aria-hidden="true" className="text-2xl text-zela-700">{estaAberta ? "−" : "+"}</span>
                </button>
              </h2>
              {estaAberta && (
                <p id={`resposta-${indice}`} className="px-5 pb-5 text-slate-700">{item.resposta}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
