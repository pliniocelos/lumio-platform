import { Injectable } from '@nestjs/common';
import { CreateInscricoeDto } from './dto/create-inscricoe.dto';
import { UpdateInscricoeDto } from './dto/update-inscricoe.dto';

@Injectable()
export class InscricoesService {
  create(createInscricoeDto: CreateInscricoeDto) {
    return 'This action adds a new inscricoe';
  }

  findAll() {
    return `This action returns all inscricoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inscricoe`;
  }

  update(id: number, updateInscricoeDto: UpdateInscricoeDto) {
    return `This action updates a #${id} inscricoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} inscricoe`;
  }
}
