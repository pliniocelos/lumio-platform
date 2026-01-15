import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-language-switcher',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './language-switcher.component.html',
    styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
    translate = inject(TranslateService);

    changeLanguage(lang: string): void {
        this.translate.use(lang);
        localStorage.setItem('lumio_language', lang);
    }
}
