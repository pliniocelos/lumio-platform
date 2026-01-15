import { Component } from '@angular/core';

@Component({
    selector: 'app-evaluations',
    standalone: true,
    template: `
    <div class="page-header">
      <h1>Avaliações</h1>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Trabalho</th>
            <th>Avaliador</th>
            <th>Data Atribuição</th>
            <th>Nota</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Aplicação de IA na Medicina Diagnóstica</td>
            <td>Dr. Paulo Mendes</td>
            <td>01/05/2025</td>
            <td>9.5</td>
            <td><span class="badge success">Concluída</span></td>
          </tr>
          <tr>
            <td>Blockchain para Rastreabilidade</td>
            <td>Dra. Julia Costa</td>
            <td>03/05/2025</td>
            <td>-</td>
            <td><span class="badge warning">Pendente</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [`
    .page-header { margin-bottom: 1.5rem; }
    .table-container { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    th { font-weight: 600; color: #555; }
    .badge { padding: 0.25rem 0.5rem; border-radius: 99px; font-size: 0.75rem; font-weight: 600; }
    .badge.success { background: #dff0d8; color: #3c763d; }
    .badge.warning { background: #fcf8e3; color: #8a6d3b; }
  `]
})
export class EvaluationsComponent { }
