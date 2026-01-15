import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Inscricao, StatusInscricao } from '../../../core/models/inscricao.model';

@Component({
  selector: 'app-inscriptions',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent {
  showFilters = false;

  inscriptions: Inscricao[] = [
    {
      id: '1',
      eventoId: '1',
      participante: { id: 'p1', nome: 'João Pereira', email: 'joao.pereira@email.com', cpf: '123.456.789-00', pcd: { possui: true, descricao: 'Cadeirante' } },
      categoria: { id: 'c1', nome: 'Estudante', valor: 100 },
      dataInscricao: new Date('2025-04-20'),
      status: 'CONFIRMADA',
      valorTotal: 100,
      saldoDevedor: 0,
      checkins: [],
      comprovanteUrl: 'http://example.com/receipt.pdf'
    },
    {
      id: '2',
      eventoId: '1',
      participante: { id: 'p2', nome: 'Maria Fernanda', email: 'maria.f@email.com' },
      categoria: { id: 'c2', nome: 'Profissional', valor: 300 },
      dataInscricao: new Date('2025-04-22'),
      status: 'PENDENTE',
      valorTotal: 300,
      saldoDevedor: 300,
      checkins: [],
      voucher: 'DESC10'
    },
    {
      id: '3',
      eventoId: '1',
      participante: { id: 'p3', nome: 'Lucas Silva', email: 'lucas.silva@email.com' },
      categoria: { id: 'c1', nome: 'Estudante', valor: 100 },
      dataInscricao: new Date('2025-04-25'),
      status: 'ISENTO',
      valorTotal: 0,
      saldoDevedor: 0,
      checkins: []
    }
  ];

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  getBadgeClass(status: StatusInscricao): string {
    switch (status) {
      case 'CONFIRMADA': return 'success';
      case 'PENDENTE': case 'AGUARDANDO_PAGAMENTO': return 'warning';
      case 'CANCELADA': return 'danger';
      case 'ISENTO': return 'info';
      default: return '';
    }
  }
}
