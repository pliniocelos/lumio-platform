import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrabalhoDto } from './dto/create-trabalho.dto';
import { UpdateTrabalhoDto } from './dto/update-trabalho.dto';
import { Trabalho, StatusTrabalho } from './entities/trabalho.entity';
import { Avaliacao } from './entities/avaliacao.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class TrabalhosService {
  constructor(
    @InjectRepository(Trabalho)
    private trabalhosRepository: Repository<Trabalho>,
    @InjectRepository(Avaliacao)
    private avaliacoesRepository: Repository<Avaliacao>,
  ) { }

  async create(createTrabalhoDto: CreateTrabalhoDto, usuario: Usuario) {
    const trabalho = this.trabalhosRepository.create({
      ...createTrabalhoDto,
      evento: { id: createTrabalhoDto.eventoId },
      submissor: usuario,
      status: StatusTrabalho.SUBMETIDO // Status inicial
    });
    return this.trabalhosRepository.save(trabalho);
  }

  findAll(eventoId: number) {
    return this.trabalhosRepository.find({
      where: { evento: { id: eventoId } },
      relations: ['submissor']
    });
  }

  findMyself(usuarioId: number) {
    return this.trabalhosRepository.find({
      where: { submissor: { id: usuarioId } },
      relations: ['evento']
    });
  }

  async findOne(id: number) {
    const trabalho = await this.trabalhosRepository.findOne({
      where: { id },
      relations: ['evento', 'submissor', 'avaliacoes', 'avaliacoes.avaliador']
    });
    if (!trabalho) throw new NotFoundException('Trabalho não encontrado');
    return trabalho;
  }

  async update(id: number, updateTrabalhoDto: UpdateTrabalhoDto) {
    await this.trabalhosRepository.update(id, updateTrabalhoDto);
    return this.findOne(id);
  }

  // Atribuir avaliador
  async addAvaliador(trabalhoId: number, avaliadorId: number) {
    const avaliacao = this.avaliacoesRepository.create({
      trabalho: { id: trabalhoId },
      avaliador: { id: avaliadorId }
    });
    return this.avaliacoesRepository.save(avaliacao);
  }

  remove(id: number) {
    return this.trabalhosRepository.delete(id);
  }
}
