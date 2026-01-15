import { Component } from '@angular/core';

@Component({
    selector: 'app-settings',
    standalone: true,
    template: `
    <div class="page-header">
      <h1>Configurações do Evento</h1>
    </div>
    <div class="settings-content">
      <section class="card">
        <h3>Informações Gerais</h3>
        <div class="form-row">
            <div class="form-group">
                <label>Nome do Evento</label>
                <input type="text" value="Simpósio Brasileiro de IA" readonly>
            </div>
             <div class="form-group">
                <label>Tema</label>
                <input type="text" value="Tecnologia e Inovação">
            </div>
        </div>
      </section>
      
      <section class="card">
        <h3>Prazos</h3>
        <div class="form-row">
            <div class="form-group">
                <label>Início Submissões</label>
                <input type="date" value="2025-01-01">
            </div>
             <div class="form-group">
                <label>Fim Submissões</label>
                <input type="date" value="2025-03-30">
            </div>
        </div>
      </section>

      <div class="actions">
          <button class="btn-primary">Salvar Alterações</button>
      </div>
    </div>
  `,
    styles: [`
    .page-header { margin-bottom: 1.5rem; }
    .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1.5rem; }
    h3 { margin-bottom: 1rem; color: #2c3e50; font-size: 1.1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { margin-bottom: 1rem; label { display: block; margin-bottom: 0.5rem; color: #555; } input { width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; } }
    .actions { text-align: right; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 1rem; }
  `]
})
export class SettingsComponent { }
