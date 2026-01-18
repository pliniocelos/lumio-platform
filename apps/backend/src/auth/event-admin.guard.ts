import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PermissoesService } from '../permissoes/permissoes.service';

@Injectable()
export class EventAdminGuard implements CanActivate {
    constructor(
        private usuariosService: UsuariosService,
        private permissoesService: PermissoesService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Injetado pelo FirebaseAuthGuard
        const params = request.params;
        const eventoId = params.id ? parseInt(params.id) : null;

        if (!user || !user.uid) {
            return false;
        }

        if (!eventoId) {
            // Se não tem ID de evento na rota, talvez não devesse usar este guard, ou assumimos que é uma rota de listagem que filtra?
            // Mas o objetivo aqui é proteger edição/acesso de evento específico.
            return true;
        }

        const usuario = await this.usuariosService.findByFirebaseUid(user.uid);

        if (!usuario) {
            throw new ForbiddenException('Usuário não cadastrado.');
        }

        // Verifica permissão (Admin do evento)
        // Opcionalmente poderia aceitar 'visualizador' se parametrizado, mas o nome do guard é EventAdmin
        const hasPermission = await this.permissoesService.checkPermission(usuario, eventoId, 'admin');

        if (!hasPermission) {
            throw new ForbiddenException('Você não tem permissão de administrador para este evento.');
        }

        request.usuarioBanco = usuario; // Injeta usuário do banco
        return true;
    }
}
