import { Component, Input } from '@angular/core';
import { Task } from '../../classes/task';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() bgColor: string = 'bg-white';
  @Input() task: Task | any = new Task();

  constructor(
    public taskService: TaskService,
    public userService: UserService,
    public toastr: ToastrService,
    public router: Router
  ) {}

  bgOpacity: string = 'bg-opacity-[2%]';
  textColor: string = 'text-' + this.bgColor.split('bg-')[1];

  moveForward(task_id: string) {
    this.taskService.moveTaskForward(task_id).subscribe({
      next: (value) => {
        this.taskService.getAllTask();
        console.log(value);
        this.toastr.success(value.message);
      },
      error: (error) => {
        this.errorHandleUnauthorized(error);
      },
    });
  }

  movBackward(task_id: string) {
    this.taskService.moveTaskBackward(task_id).subscribe({
      next: (value) => {
        this.taskService.getAllTask();
        console.log(value);
        this.toastr.success(value.message);
      },
      error: (error) => {
        this.errorHandleUnauthorized(error);
        console.error('Error:', error);
      },
    });
  }

  editTask(task: Task) {
    console.log(this.taskService.editTaskFormData);
    this.taskService.editTaskFormData = task;
    console.log(this.taskService.editTaskFormData);
    this.taskService.taskFormState = true;
  }

  deleteTask(task_id: string) {
    const confirmation = confirm('Are you sure you want to delete this task');
    if (confirmation) {
      this.taskService.deleteTask(task_id).subscribe({
        next: (value) => {
          this.toastr.success(value.message);
          this.taskService.getAllTask();
          console.log(value);
        },
        error: (error) => {
          this.errorHandleUnauthorized(error);
          console.error('Error:', error);
        },
      });
    }
  }

  errorHandleUnauthorized(error: any): void {
    if (error.status === 403) {
      this.toastr.error(error.error.message);
      this.router.navigate(['/login']);
    } else {
      this.toastr.error(error.error.message);
    }
  }
}
