import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { eventContextGuard } from './core/guards/event-context.guard';
import { registrationIntentGuard } from './core/guards/registration-intent.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/public/public-layout.component').then(m => m.PublicLayoutComponent),
        canActivate: [guestGuard, registrationIntentGuard],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
                path: 'login',
                loadComponent: () => import('./views/auth/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'recuperar-senha',
                loadComponent: () => import('./views/auth/recovery/recovery.component').then(m => m.RecoveryComponent)
            },
            {
                path: 'cadastro',
                loadComponent: () => import('./views/auth/register/register.component').then(m => m.RegisterComponent)
            }
        ]
    },
    {
        path: 'selecionar-evento',
        loadComponent: () => import('./views/event-selector/event-selector.component').then(m => m.EventSelectorComponent),
        canActivate: [authGuard]
    },
    {
        path: 'sistema',
        loadComponent: () => import('./layout/admin/admin-layout.component').then(m => m.AdminLayoutComponent),
        canActivate: [authGuard, eventContextGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'secretaria',
                children: [
                    {
                        path: 'resumo',
                        loadComponent: () => import('./views/admin/secretaria/resumo/secretaria-resumo.component').then(m => m.SecretariaResumoComponent)
                    },
                    {
                        path: 'realizacao',
                        loadComponent: () => import('./views/admin/secretaria/realizacao/secretaria-realizacao.component').then(m => m.SecretariaRealizacaoComponent)
                    }
                ]
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./views/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'trabalhos',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./views/admin/submissions/submissions.component').then(m => m.SubmissionsComponent)
                    },
                    {
                        path: 'avaliacoes',
                        loadComponent: () => import('./views/admin/evaluations/evaluations.component').then(m => m.EvaluationsComponent)
                    }
                ]
            },
            {
                path: 'inscricoes',
                children: [
                    {
                        path: 'resumo',
                        loadComponent: () => import('./views/admin/inscricoes/resumo/inscricoes-resumo.component').then(m => m.InscricoesResumoComponent)
                    },
                    {
                        path: 'congressistas',
                        loadComponent: () => import('./views/admin/inscriptions/inscriptions.component').then(m => m.InscriptionsComponent)
                    }
                ]
            },
            {
                path: 'programacao',
                children: [
                    {
                        path: 'atividades',
                        loadComponent: () => import('./views/admin/programacao/atividades/atividades').then(m => m.AtividadesComponent)
                    }
                ]
            },
            {
                path: 'certificados',
                loadComponent: () => import('./views/admin/certificates/certificates.component').then(m => m.CertificatesComponent)
            },
            {
                path: 'configuracoes',
                loadComponent: () => import('./views/admin/settings/settings.component').then(m => m.SettingsComponent)
            }
        ]
    },
    {
        path: 'area-congressista',
        loadComponent: () => import('./layout/congressista/congressista-layout.component').then(m => m.CongressistaLayoutComponent),
        canActivate: [authGuard, eventContextGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./views/congressista/dashboard/congressista-dashboard.component').then(m => m.CongressistaDashboardComponent)
            },
            {
                path: 'minhas-inscricoes',
                loadComponent: () => import('./views/congressista/minhas-inscricoes/minhas-inscricoes.component').then(m => m.MinhasInscricoesComponent)
            }
        ]
    },
    {
        path: 'eventos-disponiveis',
        loadComponent: () => import('./views/public/eventos-disponiveis/eventos-disponiveis.component').then(m => m.EventosDisponiveisComponent)
    },
    {
        path: 'inscricao/:eventSlug',
        loadComponent: () => import('./views/registration/registration-form/registration-form.component').then(m => m.RegistrationFormComponent),
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'login' }
];

