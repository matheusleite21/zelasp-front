import fotoLeite from "../assets/integrantes/matheus-leite.jpeg";
import fotoRuiz from "../assets/integrantes/matheus-ruiz.jpeg";
import type { Integrante } from "../types/integrante";

export const integrantes: Integrante[] = [
  {
    rm: "573416",
    nome: "Matheus Leite Souza das Virgens",
    turma: "1TDSPO",
    foto: fotoLeite,
    papel: "API Java, banco de dados e IA",
    descricao:
      "Responsável pela API REST em Spring Boot com JDBC, pela modelagem do banco Oracle e pelos " +
      "modelos de Machine Learning que estimam o prazo e o risco de atraso das ocorrências.",
    github: "https://github.com/matheusleite21",
    linkedin: "https://www.linkedin.com/in/matheus-leite-aaab75352/",
  },
  {
    rm: "570701",
    nome: "Matheus Ruiz Giatti",
    turma: "1TDSPO",
    foto: fotoRuiz,
    papel: "Front-end, painel Python e negócio",
    descricao:
      "Responsável pelas telas do site em React e Tailwind, pelo painel de triagem da prefeitura em " +
      "Python e pela documentação de negócio, backlog e casos de uso.",
    github: "https://github.com/matheusruiz-07",
    linkedin: "https://www.linkedin.com/in/matheus-ruiz-giatti/",
  },
];

export function buscarIntegrante(rm: string): Integrante | undefined {
  return integrantes.find((i) => i.rm === rm);
}
