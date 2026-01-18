import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Pagamento } from './entities/pagamento.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { InscricoesService } from '../inscricoes/inscricoes.service';
// import MercadoPago from 'mercadopago'; // Integrar depois

@Injectable()
export class PagamentosService {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentosRepository: Repository<Pagamento>,
    private inscricoesService: InscricoesService,
    private configService: ConfigService,
  ) { }

  async create(createPagamentoDto: CreatePagamentoDto) {
    const inscricao = await this.inscricoesService.findOne(createPagamentoDto.inscricaoId);

    if (!inscricao) {
      throw new NotFoundException('Inscrição não encontrada');
    }

    if (inscricao.status === 'confirmada') {
      throw new BadRequestException('Inscrição já está confirmada.');
    }

    const valor = createPagamentoDto.valor || (inscricao.valorTotal - inscricao.valorDesconto);

    if (valor <= 0) {
      // Cortesia total?
      // Lógica de cortesia deve ser tratada separadamente ou aqui
    }

    // 1. Cria registro pendente
    const pagamento = this.pagamentosRepository.create({
      inscricao: inscricao, // Salva o objeto para relação
      metodo: createPagamentoDto.metodo,
      valor: valor,
      status: 'pendente',
      externalReference: `LUMIO-${Date.now()}-${Math.floor(Math.random() * 1000)}` // Temp
    });

    const salvo = await this.pagamentosRepository.save(pagamento);

    // 2. Integração com Mercado Pago (TODO)
    // Aqui geraria o QR Code Pix ou Link de Pagamento

    return salvo;
  }

  async findAll() {
    return this.pagamentosRepository.find({ relations: ['inscricao'] });
  }

  async findOne(id: number) {
    return this.pagamentosRepository.findOne({ where: { id }, relations: ['inscricao'] });
  }

  // Webhook processar
  async updateStatus(externalReference: string, status: string) {
    const pagamento = await this.pagamentosRepository.findOne({
      where: { externalReference },
      relations: ['inscricao']
    });
    if (!pagamento) return null;

    pagamento.status = status;
    if (status === 'aprovado') {
      pagamento.dataAprovacao = new Date();
      // Atualiza inscrição
      await this.inscricoesService.update(pagamento.inscricao.id, {
        status: 'confirmada',
        valorPago: pagamento.valor
      } as any);
    }

    return this.pagamentosRepository.save(pagamento);
  }
}
