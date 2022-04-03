# Smoth Scroll

Componente simple que permite desplazarse a un elemento específico de la página con una transición.

smoth-scroll.component.html
```html
<div>
  <button (click)="scroll(home)">Home</button>
  <button (click)="scroll(about)">About</button>
  <button (click)="scroll(contact)">Contact</button>

  <div>
    <div #home>
      <h2>Home</h2>
    </div>
    <div #about>
      <h2>About</h2>
    </div>
    <div #contact>
      <h2>Contact</h2>
    </div>
  </div>
</div>
```

smoth-scroll.component.ts
```js
scroll(section: HTMLElement) {
  new ElementRef(section).nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
```