import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from './entities/lote.entity';
import { ValorCategoria } from './entities/valor-categoria.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Lote, ValorCategoria])],
    exports: [TypeOrmModule],
})
export class LotesModule { }
