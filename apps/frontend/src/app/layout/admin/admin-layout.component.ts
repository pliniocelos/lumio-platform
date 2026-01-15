import { Component, inject, effect, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContextService } from '../../core/services/context.service';
import { AuthService } from '../../core/services/auth.service';
import { filter } from 'rxjs/operators';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  contextService = inject(ContextService);
  authService = inject(AuthService);
  router = inject(Router);
  translate = inject(TranslateService);

  isSecretariaOpen = false;
  isInscricoesOpen = false;
  isTrabalhosOpen = false;
  isProgramacaoOpen = false;
  isMobileSidebarOpen = false;

  constructor() {
    // Auto-open if active
    effect(() => {
      if (this.isSecretariaActive()) {
        this.isSecretariaOpen = true;
      }
      if (this.isInscricoesActive()) {
        this.isInscricoesOpen = true;
      }
      if (this.isTrabalhosActive()) {
        this.isTrabalhosOpen = true;
      }
      if (this.isProgramacaoActive()) {
        this.isProgramacaoOpen = true;
      }
    });

    // Close sidebar on navigation (mobile)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isMobileSidebarOpen = false;
    });
  }

  toggleSecretaria() {
    this.isSecretariaOpen = !this.isSecretariaOpen;
  }

  isSecretariaActive(): boolean {
    return this.router.url.includes('/secretaria');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  toggleInscricoes() {
    this.isInscricoesOpen = !this.isInscricoesOpen;
  }

  isInscricoesActive(): boolean {
    return this.router.url.includes('/inscricoes');
  }

  toggleTrabalhos() {
    this.isTrabalhosOpen = !this.isTrabalhosOpen;
  }

  isTrabalhosActive(): boolean {
    return this.router.url.includes('/trabalhos');
  }

  toggleProgramacao() {
    this.isProgramacaoOpen = !this.isProgramacaoOpen;
  }

  isProgramacaoActive(): boolean {
    return this.router.url.includes('/programacao');
  }

  logout() {
    this.authService.logout();
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }

  switchEvent() {
    // Clear selected event before navigating to event selector
    // This prevents auto-redirect back to dashboard
    this.contextService.clearSelectedEvent();
    this.router.navigate(['/selecionar-evento']);
  }
}
