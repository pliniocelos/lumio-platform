import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissaoEvento } from './entities/permissao-evento.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreatePermissaoDto } from './dto/create-permissao.dto';

@Injectable()
export class PermissoesService {
    constructor(
        @InjectRepository(PermissaoEvento)
        private permissoesRepository: Repository<PermissaoEvento>,
    ) { }

    async create(createPermissaoDto: CreatePermissaoDto) {
        // Verifica se já existe
        const existente = await this.permissoesRepository.findOne({
            where: {
                usuario: { id: createPermissaoDto.usuarioId },
                evento: { id: createPermissaoDto.eventoId }
            }
        });

        if (existente) {
            // Atualiza se já existir
            existente.papel = createPermissaoDto.papel;
            existente.ativo = true;
            return this.permissoesRepository.save(existente);
        }

        const permissao = this.permissoesRepository.create({
            usuario: { id: createPermissaoDto.usuarioId },
            evento: { id: createPermissaoDto.eventoId },
            papel: createPermissaoDto.papel,
        });
        return this.permissoesRepository.save(permissao);
    }

    async findByEvento(eventoId: number) {
        return this.permissoesRepository.find({
            where: { evento: { id: eventoId } },
            relations: ['usuario'],
        });
    }

    async remove(id: number) {
        return this.permissoesRepository.delete(id);
    }

    async checkPermission(usuario: Usuario, eventoId: number, requiredRole: 'admin' | 'visualizador'): Promise<boolean> {
        // 1. Super Admin tem acesso total
        if (usuario.isSuperAdmin) {
            return true;
        }

        // 2. Busca permissão específica
        const permissao = await this.permissoesRepository.findOne({
            where: {
                usuario: { id: usuario.id },
                evento: { id: eventoId },
                ativo: true,
            },
            relations: ['usuario', 'evento'] // Garante carregamento se necessário
        });

        if (!permissao) {
            return false;
        }

        // 3. Verifica hierarquia de papéis
        if (requiredRole === 'admin' && permissao.papel !== 'admin') {
            return false; // Precisa ser admin, mas é visualizador
        }

        return true;
    }
}
