import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Task } from '../../classes/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent {
  constructor(public userService: UserService, public taskService: TaskService) { }
}
