import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.tsx";
import Erro from "./pages/Erro.tsx";
import Cadastro from "./pages/Cadastro.tsx";
import Contato from "./pages/Contato.tsx";
import Faq from "./pages/Faq.tsx";
import Home from "./pages/Home.tsx";
import IntegranteDetalhe from "./pages/IntegranteDetalhe.tsx";
import Integrantes from "./pages/Integrantes.tsx";
import Ocorrencias from "./pages/Ocorrencias.tsx";
import Sobre from "./pages/Sobre.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Erro />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/faq", element: <Faq /> },
      { path: "/contato", element: <Contato /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/integrantes/:rm", element: <IntegranteDetalhe /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/ocorrencias", element: <Ocorrencias /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
