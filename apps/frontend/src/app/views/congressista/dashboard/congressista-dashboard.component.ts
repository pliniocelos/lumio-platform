import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextService } from '../../../core/services/context.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-congressista-dashboard',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './congressista-dashboard.component.html',
    styleUrl: './congressista-dashboard.component.scss'
})
export class CongressistaDashboardComponent {
    contextService = inject(ContextService);
}
