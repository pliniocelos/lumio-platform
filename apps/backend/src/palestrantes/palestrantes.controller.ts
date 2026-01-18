import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PalestrantesService } from './palestrantes.service';
import { CreatePalestranteDto } from './dto/create-palestrante.dto';
import { UpdatePalestranteDto } from './dto/update-palestrante.dto';

@Controller('palestrantes')
export class PalestrantesController {
  constructor(private readonly palestrantesService: PalestrantesService) {}

  @Post()
  create(@Body() createPalestranteDto: CreatePalestranteDto) {
    return this.palestrantesService.create(createPalestranteDto);
  }

  @Get()
  findAll() {
    return this.palestrantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.palestrantesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePalestranteDto: UpdatePalestranteDto) {
    return this.palestrantesService.update(+id, updatePalestranteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.palestrantesService.remove(+id);
  }
}
