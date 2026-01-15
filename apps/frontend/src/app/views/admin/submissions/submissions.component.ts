import { Component } from '@angular/core';

@Component({
    selector: 'app-submissions',
    standalone: true,
    template: `
    <div class="page-header">
      <h1>Trabalhos</h1>
      <button class="btn-primary">Nova Submissão</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor Principal</th>
            <th>Área</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>101</td>
            <td>Aplicação de IA na Medicina Diagnóstica</td>
            <td>Ana Silva</td>
            <td>Saúde</td>
            <td><span class="badge success">Aprovado</span></td>
            <td><button class="btn-icon">👁️</button></td>
          </tr>
          <tr>
            <td>102</td>
            <td>Blockchain para Rastreabilidade</td>
            <td>Carlos Souza</td>
            <td>Tecnologia</td>
            <td><span class="badge warning">Em Análise</span></td>
            <td><button class="btn-icon">👁️</button></td>
          </tr>
          <tr>
            <td>103</td>
            <td>Educação 4.0: Desafios</td>
            <td>Mariana Oliveira</td>
            <td>Educação</td>
            <td><span class="badge danger">Rejeitado</span></td>
            <td><button class="btn-icon">👁️</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .table-container { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    th { font-weight: 600; color: #555; }
    .badge { padding: 0.25rem 0.5rem; border-radius: 99px; font-size: 0.75rem; font-weight: 600; }
    .badge.success { background: #dff0d8; color: #3c763d; }
    .badge.warning { background: #fcf8e3; color: #8a6d3b; }
    .badge.danger { background: #f2dede; color: #a94442; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 1.1rem; }
  `]
})
export class SubmissionsComponent { }
