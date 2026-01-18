import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { PermissoesService } from '../permissoes/permissoes.service';

@Controller('atividades')
export class AtividadesController {
  constructor(
    private readonly atividadesService: AtividadesService,
    private readonly permissoesService: PermissoesService
  ) { }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async create(@Body() createAtividadeDto: CreateAtividadeDto, @Req() req) {
    const usuario = req.usuarioBanco;
    if (!usuario) throw new ForbiddenException('Usuário não identificado');

    const permitido = await this.permissoesService.checkPermission(usuario, createAtividadeDto.eventoId, 'admin');
    if (!permitido) {
      throw new ForbiddenException('Você não tem permissão de administrador neste evento.');
    }

    return this.atividadesService.create(createAtividadeDto);
  }

  @Get()
  findAll(@Query('eventoId') eventoId: string) {
    if (!eventoId) {
      throw new BadRequestException('Parâmetro eventoId é obrigatório para listar atividades.');
    }
    return this.atividadesService.findByEvento(+eventoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atividadesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard)
  async update(@Param('id') id: string, @Body() updateAtividadeDto: UpdateAtividadeDto, @Req() req) {
    const usuario = req.usuarioBanco;
    const atividade = await this.atividadesService.findOne(+id);

    if (!atividade) throw new NotFoundException('Atividade não encontrada');

    const permitido = await this.permissoesService.checkPermission(usuario, atividade.evento.id, 'admin');
    if (!permitido) {
      throw new ForbiddenException('Você não tem permissão para editar esta atividade.');
    }

    return this.atividadesService.update(+id, updateAtividadeDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  async remove(@Param('id') id: string, @Req() req) {
    const usuario = req.usuarioBanco;
    const atividade = await this.atividadesService.findOne(+id);

    if (!atividade) throw new NotFoundException('Atividade não encontrada');

    const permitido = await this.permissoesService.checkPermission(usuario, atividade.evento.id, 'admin');
    if (!permitido) {
      throw new ForbiddenException('Você não tem permissão para remover esta atividade.');
    }

    return this.atividadesService.remove(+id);
  }
}
