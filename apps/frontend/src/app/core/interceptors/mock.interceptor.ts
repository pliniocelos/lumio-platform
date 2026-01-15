import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { AppContext, Evento, UserEventRole } from '../models/context.model';
import { Registration, RegistrationStatus, EventEligibility } from '../models/registration.model';

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
    // Pass through asset requests
    if (req.url.includes('assets/')) {
        return next(req);
    }

    if (req.url.endsWith('/api/context') && req.method === 'GET') {
        const mockContext: AppContext = {
            tenant: {
                id: 1,
                nome: "Lumio"
            },
            evento: localStorage.getItem('lumio_selected_event')
                ? JSON.parse(localStorage.getItem('lumio_selected_event')!).evento
                : null,
            usuario: localStorage.getItem('lumio_user') ? JSON.parse(localStorage.getItem('lumio_user')!) : null,
            selectedEventRole: localStorage.getItem('lumio_selected_event')
                ? JSON.parse(localStorage.getItem('lumio_selected_event')!).role
                : null
        };

        return of(new HttpResponse({
            status: 200,
            body: mockContext
        })).pipe(delay(100)); // Reduced from 500ms to 100ms to minimize race conditions
    }

    // Mock user events endpoint - returns events associated with a user
    if (req.url.match(/\/api\/user\/(.+)\/events/) && req.method === 'GET') {
        const userId = req.url.match(/\/api\/user\/(.+)\/events/)![1];

        // Mock different scenarios based on user ID
        let userEvents: UserEventRole[] = [];

        // Most users will have at least one event as admin
        if (userId) {
            userEvents = [
                {
                    evento: {
                        id: 10,
                        nome: "Simpósio Brasileiro de IA",
                        slug: "sbia2025",
                        idiomas: ["pt", "en"],
                        tema: "Tecnologia e Inovação"
                    },
                    role: 'admin'
                },
                {
                    evento: {
                        id: 20,
                        nome: "Congresso de Computação",
                        slug: "comcomp2025",
                        idiomas: ["pt"],
                        tema: "Ciência da Computação"
                    },
                    role: 'user',
                    inscricaoId: 'INS-2025-001'
                },
                {
                    evento: {
                        id: 30,
                        nome: "Workshop de Machine Learning",
                        slug: "ml-workshop-2025",
                        idiomas: ["pt", "en"],
                        tema: "Inteligência Artificial"
                    },
                    role: 'admin'
                }
            ];
        }

        return of(new HttpResponse({
            status: 200,
            body: userEvents
        })).pipe(delay(600));
    }

    // Mock available events endpoint - returns all available events for registration
    if (req.url.endsWith('/api/events/available') && req.method === 'GET') {
        const availableEvents: Evento[] = [
            {
                id: 10,
                nome: "Simpósio Brasileiro de IA",
                slug: "sbia2025",
                idiomas: ["pt", "en"],
                tema: "Tecnologia e Inovação"
            },
            {
                id: 20,
                nome: "Congresso de Computação",
                slug: "comcomp2025",
                idiomas: ["pt"],
                tema: "Ciência da Computação"
            },
            {
                id: 30,
                nome: "Workshop de Machine Learning",
                slug: "ml-workshop-2025",
                idiomas: ["pt", "en"],
                tema: "Inteligência Artificial"
            },
            {
                id: 40,
                nome: "Conferência de Segurança Cibernética",
                slug: "cybersec2025",
                idiomas: ["pt", "en", "es"],
                tema: "Segurança da Informação"
            }
        ];

        return of(new HttpResponse({
            status: 200,
            body: availableEvents
        })).pipe(delay(400));
    }

    if (req.url.endsWith('/api/auth/login') && req.method === 'POST') {
        const { email, password } = req.body as any;

        // Mock validation
        if (email === 'admin@lumio.com' && password === '123456') {
            const user = {
                id: '1',
                nome: "Administrador Lumio",
                email: "admin@lumio.com",
                eventos: [] // Will be populated from /api/user/events
            };

            // Persist mock session
            localStorage.setItem('lumio_token', 'mock-jwt-token');
            localStorage.setItem('lumio_user', JSON.stringify(user));

            return of(new HttpResponse({
                status: 200,
                body: { token: 'mock-jwt-token', user }
            })).pipe(delay(800));
        } else {
            return of(new HttpResponse({
                status: 401,
                body: { message: 'Credenciais inválidas' }
            })).pipe(delay(800)); // Simulate mock error
        }
    }

    // Mock available events for registration endpoint
    if (req.url.endsWith('/api/events/available-for-registration') && req.method === 'GET') {
        const availableEvents: Evento[] = [
            {
                id: 10,
                nome: "Simpósio Brasileiro de IA",
                slug: "sbia2026",
                idiomas: ["pt", "en"],
                tema: "Tecnologia e Inovação"
            },
            {
                id: 40,
                nome: "Conferência de Segurança Cibernética",
                slug: "cybersec2026",
                idiomas: ["pt", "en", "es"],
                tema: "Segurança da Informação"
            }
        ];

        return of(new HttpResponse({
            status: 200,
            body: availableEvents
        })).pipe(delay(400));
    }

    // Mock event eligibility check endpoint
    if (req.url.match(/\/api\/events\/(.+)\/eligibility/) && req.method === 'GET') {
        const eligibility: EventEligibility = {
            canRegister: true,
            reasons: [],
            registrationDeadline: "2026-06-30T23:59:59Z",
            availableSlots: 50,
            isAlreadyRegistered: false
        };

        return of(new HttpResponse({
            status: 200,
            body: eligibility
        })).pipe(delay(300));
    }

    // Mock create registration endpoint
    if (req.url.endsWith('/api/registrations') && req.method === 'POST') {
        const body = req.body as any;
        const registration: Registration = {
            id: 'REG-' + Date.now(),
            eventoId: 10,
            eventoNome: 'Simpósio Brasileiro de IA',
            eventoSlug: body.eventoSlug || 'sbia2026',
            usuarioId: body.usuarioId || '1',
            categoria: body.categoria || 'profissional',
            status: RegistrationStatus.PENDENTE_PAGAMENTO,
            dataCriacao: new Date().toISOString()
        };

        return of(new HttpResponse({
            status: 201,
            body: registration
        })).pipe(delay(500));
    }

    // Mock user registrations endpoint
    if (req.url.match(/\/api\/user\/(.+)\/registrations/) && req.method === 'GET') {
        const registrations: Registration[] = [
            {
                id: 'REG-001',
                eventoId: 10,
                eventoNome: 'Simpósio Brasileiro de IA',
                eventoSlug: 'sbia2025',
                usuarioId: '1',
                categoria: 'profissional',
                status: RegistrationStatus.CONFIRMADA,
                dataCriacao: '2025-01-10T10:00:00Z',
                dataConfirmacao: '2025-01-11T14:30:00Z',
                valorPago: 350.00
            },
            {
                id: 'REG-002',
                eventoId: 20,
                eventoNome: 'Congresso de Computação',
                eventoSlug: 'comcomp2025',
                usuarioId: '1',
                categoria: 'estudante',
                status: RegistrationStatus.PENDENTE_PAGAMENTO,
                dataCriacao: '2025-12-15T09:00:00Z'
            }
        ];

        return of(new HttpResponse({
            status: 200,
            body: registrations
        })).pipe(delay(400));
    }

    // Mock cancel registration endpoint
    if (req.url.match(/\/api\/registrations\/(.+)/) && req.method === 'DELETE') {
        return of(new HttpResponse({
            status: 204
        })).pipe(delay(300));
    }

    // Pass through other requests (or mock login later)
    return next(req);
};

