import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [RouterLink],
    template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a routerLink="/sistema/dashboard">Home</a></li>
        @for (item of breadcrumbs; track item.path) {
           <li class="breadcrumb-item active" aria-current="page">{{ item.label }}</li>
        }
      </ol>
    </nav>
  `,
    styles: [`
    .breadcrumb {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin-bottom: 1rem;
      list-style: none;
    }
    .breadcrumb-item {
      color: #6c757d;
      font-size: 0.875rem;
      + .breadcrumb-item {
        padding-left: 0.5rem;
        &::before {
          display: inline-block;
          padding-right: 0.5rem;
          color: #6c757d;
          content: "/";
        }
      }
      a { color: #3498db; text-decoration: none; &:hover { text-decoration: underline; } }
      &.active { color: #6c757d; }
    }
  `]
})
export class BreadcrumbComponent implements OnInit {
    router = inject(Router);
    breadcrumbs: Array<{ label: string, path: string }> = [];

    ngOnInit() {
        // Simple mock breadcrumb logic based on URL segments
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.updateBreadcrumbs();
        });
        this.updateBreadcrumbs();
    }

    updateBreadcrumbs() {
        const segments = this.router.url.split('/').slice(2); // Skip /sistema
        this.breadcrumbs = segments.map(segment => ({
            label: segment.charAt(0).toUpperCase() + segment.slice(1),
            path: segment
        }));
    }
}
