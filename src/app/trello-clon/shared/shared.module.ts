import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from './components/btn/btn.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  exports: [BtnComponent],
  imports: [CommonModule, FontAwesomeModule, BtnComponent]
})
export class SharedModule {}
