import { AfterContentInit, Component, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { ThumbnailListComponent } from '../components/content/thumbnail-list/thumbnail-list.component';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
  standalone: true,
  imports: [ThumbnailListComponent, NgClass]
})
export class PromoComponent implements AfterContentInit {
  isColor01 = false;

  constructor(private hostRef: ElementRef) {}

  ngAfterContentInit(): void {
    this.isColor01 = this.hostRef.nativeElement.classList.contains('color--01');
  }
}
