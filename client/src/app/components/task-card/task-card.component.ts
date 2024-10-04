import { Component, Input } from '@angular/core';
import { Task } from '../../classes/task';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() bgColor: string = 'bg-white';
  @Input() task: Task | any = new Task();


  constructor(public taskService: TaskService, public userService: UserService) { }

  bgOpacity: string = 'bg-opacity-[2%]'
  textColor: string = 'text-' + this.bgColor.split('bg-')[1]





  moveForward(task_id: string) {
    this.taskService.moveTaskForward(this.userService.userData._id, task_id).subscribe({
      next: (value) => {
        // alert(value.message)
        this.taskService.getAllTask()
        console.log(value);
      },
      error(error) {
        console.error('Error:', error);
        alert(error.error.message);
      }
    })
  }

  movBackward(task_id: string) {
    this.taskService.moveTaskBackward(this.userService.userData._id, task_id).subscribe({
      next: (value) => {
        // alert(value.message)
        this.taskService.getAllTask()
        console.log(value);
      },
      error(error) {
        console.error('Error:', error);
        alert(error.error.message);
      }
    })
  }

  editTask(task: Task) {
    console.log(this.taskService.editTaskFormData);

    this.taskService.editTaskFormData = task
    console.log(this.taskService.editTaskFormData);

    this.taskService.taskFormState = true
  }

  deleteTask(user_id: string, task_id: string) {
    const confirmation = confirm('Are you sure you want to delete this task')
    if (confirmation) {
      this.taskService.deleteTask(user_id, task_id).subscribe({
        next: (value) => {
          alert(value.message)
          this.taskService.getAllTask()
          console.log(value);
        },
        error(error) {
          console.error('Error:', error);
        }
      })
    }
  }
}
