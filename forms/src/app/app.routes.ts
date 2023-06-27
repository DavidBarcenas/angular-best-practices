import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'template-driven',
    title: 'Template-Driven Forms Playground',
    loadComponent: () =>
      import('./template-forms/template-forms-page/template-forms-page.component').then(
        (c) => c.TemplateFormsPageComponent
      ),
  },
  {
    path: 'filters',
    title: 'Advanced Filters Playground',
    loadComponent: () => import('./filters/filters.component').then((c) => c.FiltersComponent),
  },
  { path: '', redirectTo: 'template-driven', pathMatch: 'full' },
];
