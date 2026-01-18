import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { TrabalhosService } from './trabalhos.service';
import { CreateTrabalhoDto } from './dto/create-trabalho.dto';
import { UpdateTrabalhoDto } from './dto/update-trabalho.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { PermissoesService } from '../permissoes/permissoes.service';

@Controller('trabalhos')
@UseGuards(FirebaseAuthGuard)
export class TrabalhosController {
  constructor(
    private readonly trabalhosService: TrabalhosService,
    private readonly permissoesService: PermissoesService
  ) { }

  @Post()
  create(@Body() createTrabalhoDto: CreateTrabalhoDto, @Req() req) {
    // Qualquer usuário autenticado pode submeter? Em teoria sim, ou verificar inscrição.
    return this.trabalhosService.create(createTrabalhoDto, req.usuarioBanco);
  }

  @Get()
  async findAll(@Query('eventoId') eventoId: string, @Req() req) {
    if (!eventoId) throw new BadRequestException('eventoId obrigatório');

    // Apenas admin/avaliador vê todos.
    const permitido = await this.permissoesService.checkPermission(req.usuarioBanco, +eventoId, 'admin');
    if (!permitido) throw new ForbiddenException('Apenas administradores podem ver todos os trabalhos.');

    return this.trabalhosService.findAll(+eventoId);
  }

  @Get('meus')
  findMyWorks(@Req() req) {
    return this.trabalhosService.findMyself(req.usuarioBanco.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const trabalho = await this.trabalhosService.findOne(+id);

    // Quem pode ver? Dono ou Admin.
    const isOwner = trabalho.submissor.id === req.usuarioBanco.id;
    if (isOwner) return trabalho;

    const isAdmin = await this.permissoesService.checkPermission(req.usuarioBanco, trabalho.evento.id, 'admin');
    if (isAdmin) return trabalho;

    throw new ForbiddenException('Acesso negado');
  }

  @Post(':id/avaliadores')
  async addAvaliador(@Param('id') id: string, @Body('avaliadorId') avaliadorId: number, @Req() req) {
    const trabalho = await this.trabalhosService.findOne(+id);
    const isAdmin = await this.permissoesService.checkPermission(req.usuarioBanco, trabalho.evento.id, 'admin');
    if (!isAdmin) throw new ForbiddenException();

    return this.trabalhosService.addAvaliador(+id, avaliadorId);
  }

  /* Update e Remove omitidos por brevidade, seguiriam mesma lógica de Permissão */
}
