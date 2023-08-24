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
  {
    path: 'custom-select',
    title: 'Custom Select Playground',
    loadComponent: () =>
      import('./custom-select/custom-select-page/custom-select-page.component').then(
        (c) => c.CustomSelectPageComponent
      ),
  },
  {
    path: 'dynamic-forms',
    title: 'Dynamic Forms Playground',
    loadComponent: () =>
      import('./dynamic-forms/dynamic-forms-page/dynamic-forms-page.component').then(
        (c) => c.DynamicFormsPageComponent
      ),
  },
  { path: '', redirectTo: 'dynamic-forms', pathMatch: 'full' },
];
