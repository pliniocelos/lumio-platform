import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-atividades',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './atividades.html',
  styleUrl: './atividades.scss',
})
export class AtividadesComponent {
}
