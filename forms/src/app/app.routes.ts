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
    path: 'reactive-forms',
    title: 'Reactive Forms Playground',
    loadComponent: () =>
      import('./reactive-forms/reactive-forms-page/reactive-forms-page.component').then(
        (c) => c.ReactiveFormsPageComponent
      ),
  },
  {
    path: 'filters',
    title: 'Advanced Filters Playground',
    loadComponent: () => import('./filters/filters.component').then((c) => c.FiltersComponent),
  },
  {
    path: 'custom-rating-picker',
    title: 'Custom Rating Picker',
    loadComponent: () =>
      import('./rating-picker/rating-picker-page/rating-picker-page.component').then(
        (c) => c.RatingPickerPageComponent
      ),
  },
  { path: '', redirectTo: 'custom-rating-picker', pathMatch: 'full' },
];
