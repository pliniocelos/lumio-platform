import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissaoEvento } from './entities/permissao-evento.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PermissaoEvento])],
    exports: [TypeOrmModule],
})
export class PermissoesModule { }
