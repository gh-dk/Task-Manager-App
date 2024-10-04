import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Task } from '../../classes/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrl: './manage-task.component.scss'
})
export class ManageTaskComponent {
  constructor(public userService: UserService, public taskService: TaskService) { }
}
