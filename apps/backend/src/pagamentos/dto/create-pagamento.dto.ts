export class CreatePagamentoDto {
    inscricaoId: number;
    metodo: 'pix' | 'cartao_credito' | 'boleto' | 'transferencia_manual';
    valor?: number; // Opcional, se não passado pega da inscrição
}
