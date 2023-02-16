import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Column, ToDo } from '../../models/todo.model';

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
  columns: Column[] = [
    {
      title: 'To Do',
      todos: [
        {
          id: '2',
          title: 'task 2'
        },
        {
          id: '4',
          title: 'task 4'
        }
      ]
    },
    {
      title: 'doing',
      todos: [
        {
          id: '3',
          title: 'task 3'
        }
      ]
    },
    {
      title: 'done',
      todos: [
        {
          id: '1',
          title: 'task 1'
        }
      ]
    }
  ];
  todos: ToDo[] = [];
  doing: ToDo[] = [];
  done: ToDo[] = [];

  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addColumn() {
    this.columns.push({
      title: ' New column',
      todos: []
    });
  }
}
