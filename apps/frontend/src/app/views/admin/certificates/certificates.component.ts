import { Component } from '@angular/core';

@Component({
    selector: 'app-certificates',
    standalone: true,
    template: `
    <div class="page-header">
      <h1>Certificados</h1>
      <button class="btn-primary">Configurar Modelo</button>
    </div>
    <div class="stats-cards">
         <div class="mini-card">
            <span>Emitidos</span>
            <strong>120</strong>
         </div>
         <div class="mini-card">
            <span>Pendentes</span>
            <strong>450</strong>
         </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Participante</th>
            <th>Tipo</th>
            <th>Carga Horária</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>João Pereira</td>
            <td>Participação Geral</td>
            <td>20h</td>
            <td><span class="badge success">Emitido</span></td>
            <td><button class="btn-sm">Download</button></td>
          </tr>
          <tr>
            <td>Ana Silva</td>
            <td>Apresentação de Trabalho</td>
            <td>2h</td>
            <td><span class="badge neutral">Não Disponível</span></td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .stats-cards { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
    .mini-card { background: white; padding: 1rem; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); min-width: 150px; display: flex; flex-direction: column; }
    .mini-card span { font-size: 0.8rem; color: #666; margin-bottom: 0.25rem; }
    .mini-card strong { font-size: 1.5rem; color: #2c3e50; }
    .table-container { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    th { font-weight: 600; color: #555; }
    .badge { padding: 0.25rem 0.5rem; border-radius: 99px; font-size: 0.75rem; font-weight: 600; }
    .badge.success { background: #dff0d8; color: #3c763d; }
    .badge.neutral { background: #f5f5f5; color: #7f8c8d; }
    .btn-sm { padding: 0.25rem 0.5rem; border: 1px solid #ddd; background: white; border-radius: 3px; cursor: pointer; font-size: 0.8rem; }
  `]
})
export class CertificatesComponent { }
