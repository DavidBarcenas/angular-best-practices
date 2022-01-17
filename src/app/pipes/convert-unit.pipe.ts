import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUnit'
})
export class ConvertUnitPipe implements PipeTransform {
  private BASE_FEET = 3.048
  private BASE_CM   = 30.48
  private BASE_LBS  = 4.536
  private BASE_kG   = 2.205

  transform(value: number, convertTo: 'height' | 'weight'): string {
    return convertTo === 'height' ? this.convertHeight(value) : this.convertWeight(value);
  }

  private convertHeight(h: number): string {
    if(isNaN(h)) {
      return '0'
    }
    const convertToFeet = h / this.BASE_FEET
    const convertToCM = convertToFeet * this.BASE_CM
    const cm = (convertToCM % 2) === 0 ? convertToCM.toString() : convertToCM.toFixed(2)
    return cm
  }
  
  private convertWeight(w: number): string {
    if(isNaN(w)) {
      return '0'
    }
    const convertToLbs = w / this.BASE_LBS
    const convertToKg = convertToLbs / this.BASE_kG
    const kg = convertToKg.toFixed(1)
    return kg
  }
}
