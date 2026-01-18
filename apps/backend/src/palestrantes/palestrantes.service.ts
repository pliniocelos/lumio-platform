import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePalestranteDto } from './dto/create-palestrante.dto';
import { UpdatePalestranteDto } from './dto/update-palestrante.dto';
import { Palestrante } from './entities/palestrante.entity';

@Injectable()
export class PalestrantesService {
  constructor(
    @InjectRepository(Palestrante)
    private palestrantesRepository: Repository<Palestrante>,
  ) { }

  create(createPalestranteDto: CreatePalestranteDto) {
    const palestrante = this.palestrantesRepository.create(createPalestranteDto);
    return this.palestrantesRepository.save(palestrante);
  }

  findAll() {
    return this.palestrantesRepository.find();
  }

  findOne(id: number) {
    return this.palestrantesRepository.findOne({ where: { id }, relations: ['participacoes'] });
  }

  update(id: number, updatePalestranteDto: UpdatePalestranteDto) {
    return this.palestrantesRepository.update(id, updatePalestranteDto);
  }

  remove(id: number) {
    return this.palestrantesRepository.delete(id);
  }
}
