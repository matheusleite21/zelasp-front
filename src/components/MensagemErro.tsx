import Botao from "./Botao";

type MensagemErroProps = { mensagem: string; aoTentarNovamente?: () => void };

// Mostra a falha de uma requisição e, se possível, o botão para tentar de novo
export default function MensagemErro({ mensagem, aoTentarNovamente }: MensagemErroProps) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
      <p className="font-semibold">Algo deu errado</p>
      <p className="mt-1">{mensagem}</p>
      {aoTentarNovamente && (
        <Botao variante="secundario" className="mt-4" onClick={aoTentarNovamente}>
          Tentar de novo
        </Botao>
      )}
    </div>
  );
}
