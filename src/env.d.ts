// Variáveis lidas pelo Vite a partir do arquivo .env (ou da Vercel)
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
