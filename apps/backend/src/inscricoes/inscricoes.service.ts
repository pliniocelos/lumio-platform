import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInscricoeDto } from './dto/create-inscricoe.dto';
import { UpdateInscricoeDto } from './dto/update-inscricoe.dto';
import { Inscricao } from './entities/inscricoe.entity';
import { InscricaoSubevento } from './entities/inscricao-subevento.entity';

@Injectable()
export class InscricoesService {
  constructor(
    @InjectRepository(Inscricao)
    private inscricoesRepository: Repository<Inscricao>,
    @InjectRepository(InscricaoSubevento)
    private inscricaoSubeventosRepository: Repository<InscricaoSubevento>,
  ) { }

  async create(createInscricoeDto: CreateInscricoeDto) {
    // Implementação básica - expandir com validações depois
    const inscricao = this.inscricoesRepository.create(createInscricoeDto as any); // Type cast temporário se DTO não bater 100%
    return this.inscricoesRepository.save(inscricao);
  }

  async findAll() {
    return this.inscricoesRepository.find({
      relations: ['evento', 'categoria']
    });
  }

  async findOne(id: number) {
    const inscricao = await this.inscricoesRepository.findOne({
      where: { id },
      relations: ['evento', 'categoria', 'lote', 'voucher', 'pagamentos']
    });
    if (!inscricao) {
      throw new NotFoundException(`Inscrição ${id} não encontrada`);
    }
    return inscricao;
  }

  async update(id: number, updateInscricoeDto: UpdateInscricoeDto) {
    const inscricao = await this.findOne(id);
    this.inscricoesRepository.merge(inscricao, updateInscricoeDto as any);
    return this.inscricoesRepository.save(inscricao);
  }

  async remove(id: number) {
    return this.inscricoesRepository.delete(id);
  }
}
