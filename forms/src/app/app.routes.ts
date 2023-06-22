import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Template-Driven Forms Playground',
    loadComponent: () =>
      import('./template-forms/template-forms-page/template-forms-page.component').then(
        (c) => c.TemplateFormsPageComponent
      ),
  },
];
