import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
})
export class InputCurrencyComponent implements OnInit {
  form = this.fb.group({
    amount: '',
  });
  regex = /^\d{0,12}(\.\d{0,2}?$)/;
  prevAmount = '';

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.form.get('amount')?.valueChanges.subscribe(amount => {
      if (!this.regex.test(amount)) {
        this.form.get('amount')?.setValue(this.prevAmount, { emitEvent: false });
      } else {
        this.prevAmount = amount;
      }
    });
  }
}
