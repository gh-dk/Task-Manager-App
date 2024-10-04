import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Task } from '../../classes/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
})
export class TaskTableComponent {
  constructor(
    public userService: UserService,
    public taskService: TaskService
  ) {}

  sortedTasksByDate(): Task[] {
    return this.userService.userData.tasks.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      // return dateA.getTime() - dateB.getTime(); // asc
      return dateB.getTime() - dateA.getTime();
    });
  }
}
