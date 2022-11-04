import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { directives } from './directives';
import { components } from './components';
import { AccordionComponent } from './components/content/accordion/accordion.component';
import { AccordionPaneComponent } from './components/content/accordion/accordion-pane/accordion-pane.component';
import { NavbarPrimaryComponent } from './components/navigation/navbar-primary/navbar-primary.component';

@NgModule({
  declarations: [directives, components, AccordionComponent, AccordionPaneComponent, NavbarPrimaryComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, directives, components],
})
export class SharedModule {}
