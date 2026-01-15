import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="dashboard-page">
      <h1>Dashboard</h1>
      <p>Bem-vindo ao painel administrativo do Lumio Congressos.</p>
      
      <div class="cards-grid">
        <div class="card">
          <div class="title">Total de Trabalhos</div>
          <div class="value">145</div>
          <div class="trend up">+12% esta semana</div>
        </div>
        <div class="card">
          <div class="title">Avaliações Pendentes</div>
          <div class="value">32</div>
          <div class="trend down">-5% vs ontem</div>
        </div>
        <div class="card">
          <div class="title">Inscritos</div>
          <div class="value">580</div>
          <div class="trend up">+24 hoje</div>
        </div>
        <div class="card">
          <div class="title">Receita Estimada</div>
          <div class="value">R$ 45.200</div>
          <div class="trend neutral">Meta 80% atingida</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      padding: 2rem;
    }
    
    h1 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 0.5rem 0;
    }
    
    p {
      color: #666;
      margin-bottom: 2rem;
    }
    
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }
    
    .card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      border: 1px solid #eee;
      
      .title {
        font-size: 0.875rem;
        color: #666;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .value {
        font-size: 2rem;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 0.5rem;
      }
      
      .trend {
        font-size: 0.875rem;
        
        &.up { color: #27ae60; }
        &.down { color: #c0392b; }
        &.neutral { color: #7f8c8d; }
      }
    }
  `]
})
export class DashboardComponent { }
