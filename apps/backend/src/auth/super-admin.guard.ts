import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class SuperAdminGuard implements CanActivate {
    constructor(private usuariosService: UsuariosService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Injetado pelo FirebaseAuthGuard

        if (!user || !user.uid) {
            return false;
        }

        const usuario = await this.usuariosService.findByFirebaseUid(user.uid);

        if (!usuario) {
            // Opcional: Criar usuário se não existir? Ou bloquear?
            // Por segurança, bloqueamos. O usuário deve ser criado previamente ou via endpoint de registro
            throw new ForbiddenException('Usuário não cadastrado no sistema.');
        }

        if (!usuario.isSuperAdmin) {
            throw new ForbiddenException('Acesso restrito a Super Administradores.');
        }

        // Injeta o usuário do banco na request para uso posterior se necessário
        request.usuarioBanco = usuario;

        return true;
    }
}
