import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ToDo } from '../../models/todo.model';

@Component({
  templateUrl: './board.component.html',
  styles: [
    `
      /* Animate items as they're being sorted. */
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      /* Animate an item that has been dropped. */
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `
  ]
})
export class BoardComponent {
  todos: ToDo[] = [
    {
      id: '1',
      title: 'task 1'
    },
    {
      id: '2',
      title: 'task 2'
    },
    {
      id: '3',
      title: 'task 3'
    }
  ];

  drop(event: CdkDragDrop<[]>) {
    console.log(event);
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}
