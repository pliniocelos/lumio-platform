import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissaoEvento } from './entities/permissao-evento.entity';
import { PermissoesService } from './permissoes.service';
import { PermissoesController } from './permissoes.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PermissaoEvento]),
        // forwardRef(() => AuthModule) // Cuidado com dependência circular se AuthModule importar PermissoesModule
        // AuthModule exporta UsuariosService, que pode ser necessário nos Guards usados no Controller
        // Mas PermissoesModule é importado por AuthModule.
        // Solução: Guards geralmente usam Services. Controller usa Guards.
        // Se AuthModule importa PermissoesModule, PermissoesModule não deve importar AuthModule se puder evitar.
        // Mas o Controller usa @UseGuards(SuperAdminGuard). SuperAdminGuard está em AuthModule? Sim.
        // Então precisamos do AuthModule. Para evitar circular dependency, usamos forwardRef no AuthModule e aqui.
        forwardRef(() => AuthModule),
    ],
    controllers: [PermissoesController],
    providers: [PermissoesService],
    exports: [TypeOrmModule, PermissoesService],
})
export class PermissoesModule { }
