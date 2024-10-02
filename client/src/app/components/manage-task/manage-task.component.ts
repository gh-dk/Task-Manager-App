import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrl: './manage-task.component.scss'
})
export class ManageTaskComponent {
  tasks: Array<number> = [1, 2, 3, 4]
}
