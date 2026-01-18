import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PalestrantesService } from './palestrantes.service';
import { PalestrantesController } from './palestrantes.controller';
import { Palestrante } from './entities/palestrante.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Palestrante]),
    AuthModule
  ],
  controllers: [PalestrantesController],
  providers: [PalestrantesService],
  exports: [PalestrantesService]
})
export class PalestrantesModule { }
