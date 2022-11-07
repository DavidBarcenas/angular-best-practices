import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [CommonModule, SharedModule, DataTableComponent],
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.scss'],
})
export class StandaloneComponent {}
