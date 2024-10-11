import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Task } from '../../classes/task';
import { TaskService } from '../../services/task.service';
import moment from 'moment';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
})
export class TaskTableComponent {
  sortMode: string = 'desc';

  constructor(
    public userService: UserService,
    public taskService: TaskService
  ) {}

  sortedTasksByDate(): Task[] {
    return this.userService.userData.tasks.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      if (this.sortMode == 'asc')
        return dateA.getTime() - dateB.getTime(); // asc
      else return dateB.getTime() - dateA.getTime();
    });
  }

  formNow(date: Date) {
    return moment(date).fromNow();
  }

  isBefore(date: Date): boolean {
    const currentDate = moment();
    const inputDate = moment(date);

    return inputDate.isBefore(currentDate);
  }

  sortModeChange(mode: string) {
    this.sortMode = mode;
  }
}
