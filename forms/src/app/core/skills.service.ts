import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  skills$ = of(['angular', 'react', 'vue', 'node', 'git', 'typescript', 'redux']).pipe(delay(1000));
}
