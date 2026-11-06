type CarregandoProps = { texto?: string };

// Indicador de carregamento enquanto a API responde
export default function Carregando({ texto = "Carregando..." }: CarregandoProps) {
  return (
    <div role="status" aria-live="polite" className="flex items-center justify-center gap-3 py-12 text-zela-700">
      <span className="h-6 w-6 animate-spin rounded-full border-4 border-zela-100 border-t-zela-700" aria-hidden="true" />
      <span className="font-medium">{texto}</span>
    </div>
  );
}
