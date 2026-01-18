export class CreateTrabalhoDto {
    eventoId: number;
    titulo: string;
    resumo: string;
    autores: Array<{ nome: string; email?: string; apresentador?: boolean; instituicao?: string }>;
    orientador?: string;
    areaTematica?: string;
    arquivoUrl?: string;
    instrucoesEspeciais?: string;
}
