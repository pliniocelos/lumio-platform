import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContextService } from '../../core/services/context.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';

@Component({
    selector: 'app-congressista-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, TranslateModule, LanguageSwitcherComponent],
    templateUrl: './congressista-layout.component.html',
    styleUrl: './congressista-layout.component.scss'
})
export class CongressistaLayoutComponent {
    contextService = inject(ContextService);
    authService = inject(AuthService);
    router = inject(Router);
    translate = inject(TranslateService);

    isMobileSidebarOpen = false;

    constructor() {
        // Close sidebar on navigation (mobile)
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.isMobileSidebarOpen = false;
        });
    }

    changeLanguage(lang: string) {
        this.translate.use(lang);
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
