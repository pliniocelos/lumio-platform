import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissoesService } from './permissoes.service';
import { CreatePermissaoDto } from './dto/create-permissao.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { SuperAdminGuard } from '../auth/super-admin.guard';

@Controller('permissoes')
@UseGuards(FirebaseAuthGuard, SuperAdminGuard) // Tudo controlado pelo Super Admin
export class PermissoesController {
    constructor(private readonly permissoesService: PermissoesService) { }

    @Post()
    create(@Body() createPermissaoDto: CreatePermissaoDto) {
        return this.permissoesService.create(createPermissaoDto);
    }

    @Get('evento/:eventoId')
    findByEvento(@Param('eventoId') eventoId: string) {
        return this.permissoesService.findByEvento(+eventoId);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.permissoesService.remove(+id);
    }
}
