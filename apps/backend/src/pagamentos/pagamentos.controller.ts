import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) { }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(@Body() createPagamentoDto: CreatePagamentoDto) {
    // Idealmente verificar se a inscrição pertence ao usuário logado
    return this.pagamentosService.create(createPagamentoDto);
  }

  @Post('webhook')
  async webhook(@Body() body: any) {
    // Mercado Pago envia notificações aqui
    // Implementação básica: logar e processar
    console.log('Webhook MP recebido:', body);

    // SDK do MP tem método para buscar o pagamento pelo ID da notificação
    // e confirmar o status real.
    // Por enquanto, apenas retornamos OK
    return { status: 'OK' };
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll() {
    return this.pagamentosService.findAll();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  findOne(@Param('id') id: string) {
    return this.pagamentosService.findOne(+id);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagamentoDto: UpdatePagamentoDto) {
    return this.pagamentosService.update(+id, updatePagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentosService.remove(+id);
  }
  */
}
