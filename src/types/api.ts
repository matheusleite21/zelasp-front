// Formato padrão de erro devolvido pela API Java (GlobalExceptionHandler)
export interface ErroApi {
  status: number;
  erro: string;
  mensagem: string;
  caminho: string;
  campos?: Record<string, string>;
}
