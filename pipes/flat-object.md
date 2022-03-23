# Flat object

Pipe usado en el componente *grid* para acceder a propiedades de objetos anidados desde un objeto de configuración.

flat-object.pipe.ts
```js
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'flatObject',
})
export class FlatObjectPipe implements PipeTransform {
  transform(obj: any, key: string | string[]): any {
    if (Array.isArray(key)) {
      return this.flatten(key, obj);
    }
    return obj[key];
  }

  private flatten(keys: string[], obj: any) {
    keys.forEach(key => {
      obj = obj[key];
    });
    return obj;
  }
}
```

grid.component.ts
```js
columns = [
  {name: 'user', key: ['user', 'name']}
]
```

grid.component.html
```html
<!-- ...ngFor -->
<td>{{ element | flatObject: column.key }}</td>
```
