import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './firebase.strategy';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PermissoesModule } from '../permissoes/permissoes.module';

@Module({
    imports: [
        PassportModule,
        UsuariosModule,
        forwardRef(() => PermissoesModule)
    ],
    providers: [FirebaseAuthStrategy],
    exports: [PassportModule, UsuariosModule, PermissoesModule],
})
export class AuthModule { }
