import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
    constructor(private configService: ConfigService) {
        super();
        // Inicializa o Firebase Admin se ainda não estiver inicializado
        if (admin.apps.length === 0) {
            const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');

            try {
                // Tenta inicializar com applicationDefault (Google Cloud / Env Variable GOOGLE_APPLICATION_CREDENTIALS)
                // Se falhar, tenta sem credencial (útil se estiver usando emuladores ou configuração básica pública)
                // Nota: Para verificar tokens corretamente, você precisa da chave do service account em produção
                admin.initializeApp({
                    credential: admin.credential.applicationDefault(),
                    projectId: projectId,
                });
            } catch (error) {
                console.log('Fallback to no-credential initialization (requires emulator or specific setup if verification fails)');
                try {
                    admin.initializeApp({ projectId });
                } catch (e) {
                    // Already initialized ignore
                }
            }
        }
    }

    async validate(token: string): Promise<admin.auth.DecodedIdToken> {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            return decodedToken;
        } catch (error) {
            // console.error('Token validation error:', error); // Descomente para debug
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }
}
