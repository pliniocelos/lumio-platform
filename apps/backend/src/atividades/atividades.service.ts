import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import { Atividade } from './entities/atividade.entity';

@Injectable()
export class AtividadesService {
  constructor(
    @InjectRepository(Atividade)
    private atividadesRepository: Repository<Atividade>,
  ) { }

  create(createAtividadeDto: CreateAtividadeDto) {
    const atividade = this.atividadesRepository.create({
      ...createAtividadeDto,
      evento: { id: createAtividadeDto.eventoId }
    });
    return this.atividadesRepository.save(atividade);
  }

  findAll() {
    return this.atividadesRepository.find({ relations: ['evento'] });
  }

  findByEvento(eventoId: number) {
    return this.atividadesRepository.find({
      where: { evento: { id: eventoId } },
      order: { dataInicio: 'ASC' }
    });
  }

  findOne(id: number) {
    return this.atividadesRepository.findOne({ where: { id }, relations: ['evento'] });
  }

  async update(id: number, updateAtividadeDto: UpdateAtividadeDto) {
    await this.atividadesRepository.update(id, updateAtividadeDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.atividadesRepository.delete(id);
  }
}
