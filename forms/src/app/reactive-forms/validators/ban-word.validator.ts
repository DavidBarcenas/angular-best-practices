import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function banWord(words: string[] = []): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const found = words.find((word) => word.toLowerCase() === control.value?.toLowerCase());
    return found ? { banWord: found } : null;
  };
}
