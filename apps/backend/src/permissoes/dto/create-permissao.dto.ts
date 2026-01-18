export class CreatePermissaoDto {
    usuarioId: number;
    eventoId: number;
    papel: 'admin' | 'visualizador';
    // Permissões granulares opcionais...
}
