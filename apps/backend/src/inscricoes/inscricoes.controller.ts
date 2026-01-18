import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { CreateInscricoeDto } from './dto/create-inscricoe.dto';
import { UpdateInscricoeDto } from './dto/update-inscricoe.dto';

@Controller('inscricoes')
export class InscricoesController {
  constructor(private readonly inscricoesService: InscricoesService) {}

  @Post()
  create(@Body() createInscricoeDto: CreateInscricoeDto) {
    return this.inscricoesService.create(createInscricoeDto);
  }

  @Get()
  findAll() {
    return this.inscricoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inscricoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInscricoeDto: UpdateInscricoeDto) {
    return this.inscricoesService.update(+id, updateInscricoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inscricoesService.remove(+id);
  }
}
