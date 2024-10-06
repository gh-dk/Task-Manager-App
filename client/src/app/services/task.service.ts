import { Injectable } from '@angular/core';
import { Task } from '../classes/task';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  SERVER_URL = 'http://localhost:3000/task';

  public taskFormState: boolean = false;
  editTaskFormData: Task = new Task()


  constructor(public http: HttpClient, public userService: UserService) { }

  addTask(task: Task) {
    return this.http.post<{ message: string, task: [] }>(this.SERVER_URL, task)
  }

  updateTask(task: Task) {
    return this.http.put<{ message: string, task: Task }>(`${this.SERVER_URL}/${task._id}`, task);
  }

  getAllTask() {
    return this.http.get<{ message: string, tasks: Task[] }>(this.SERVER_URL).subscribe({
      next: (data) => {
        this.userService.userData.tasks = data.tasks;
        this.userService.categorizeTask()
      }, error(err) {
        console.log(err);

      },
    })
  }

  givePriority(priority: number): string {
    if (priority == 2) {
      return 'High'
    } else if (priority == 1) {
      return 'Medium'
    } else {
      return 'Low'
    }
  }

  giveStage(stage: number): string {
    if (stage == 0) {
      return 'Backlog'
    } else if (stage == 1) {
      return 'Todo'
    } else if (stage == 2) {
      return 'Ongoing'
    } else if (stage == 3) {
      return 'Done'
    } else {
      return 'Unknown'
    }
  }

  moveTaskForward(taskId: string) {
    return this.http.put<{ message: string; task: Task[] }>(`${this.SERVER_URL}/move-forward/${taskId}`, null);
  }

  moveTaskBackward(taskId: string) {
    return this.http.put<{ message: string; task: Task[] }>(`${this.SERVER_URL}/move-backward/${taskId}`, null);
  }

  deleteTask(taskId: string) {
    return this.http.delete<{ message: string; task: Task[] }>(`${this.SERVER_URL}/${taskId}`);
  }
}
