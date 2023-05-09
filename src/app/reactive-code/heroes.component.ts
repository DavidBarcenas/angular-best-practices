import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-heroes',
  template: `<header>
      <h1>Reactive Code Workshop</h1>
    </header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>`,
  styles: [
    `
      :host {
        max-height: 100vh;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      header {
        background: linear-gradient(to left, #f0c 0%, #80f 100%);
        color: #fff;
        text-align: center;
      }

      .main-content {
        flex-grow: 1;
        max-height: calc(100vh - 100px);
        overflow: auto;
        padding: 40px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet]
})
export class HeroesComponent {}
