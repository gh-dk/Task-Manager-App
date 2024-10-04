import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Task } from '../../classes/task';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnChanges {
  @Input() prefiledData: Task = new Task();

  isformTypeUpdate: boolean = false;

  taskform: FormGroup;
  constructor(
    public taskService: TaskService,
    public userService: UserService,
    private toastr: ToastrService
  ) {
    this.taskform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      stage: new FormControl('0', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
      priority: new FormControl('0', [Validators.required]),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prefiledData'] && this.prefiledData) {
      const deadLineDate = new Date(
        this.prefiledData.deadline
      ).toLocaleDateString('en-CA');

      this.taskform.patchValue({
        name: this.prefiledData.name,
        stage: this.prefiledData.stage.toString(),
        deadline: deadLineDate,
        priority: this.prefiledData.priority,
      });

      if (this.prefiledData._id !== undefined && this.prefiledData._id !== '') {
        this.isformTypeUpdate = true;
      }
      console.log(this.prefiledData._id);
    }
  }

  openTaskForm() {
    if (this.taskService.taskFormState) {
      this.taskService.editTaskFormData = new Task();
      this.isformTypeUpdate = false;
      this.taskform.reset();
    }
    this.taskService.taskFormState = !this.taskService.taskFormState;
  }

  submitForm() {
    if (this.checkDeadlineValid()) {
      this.toastr.error('Deadline should be in the future');
    } else {
      if (this.taskform.valid && this.userService.userData._id) {
        if (this.isformTypeUpdate) {
          this.taskService
            .updateTask({
              ...this.taskform.value,
              _id: this.taskService.editTaskFormData._id,
            })
            .subscribe({
              next: (success) => {
                console.log(success);
                if (success.task) {
                  this.taskService.taskFormState = false;
                  this.toastr.success(success.message);
                  this.taskService.getAllTask();
                  this.userService.categorizeTask();
                  this.taskService.editTaskFormData = new Task();
                  this.isformTypeUpdate = false;
                  this.taskform.reset();
                } else {
                  alert('something went wrong');
                }
              },
              error: (err) => {
                alert(err);
              },
            });
        } else {
          this.taskService
            .addTask({
              ...this.taskform.value,
              user_id: this.userService.userData._id,
            })
            .subscribe({
              next: (success) => {
                console.log(success);
                if (success.task) {
                  this.taskService.taskFormState = false;
                  this.toastr.success(success.message);
                  this.userService.userData.tasks.push(
                    success.task as unknown as Task
                  );
                  this.userService.categorizeTask();
                  this.taskService.editTaskFormData = new Task();
                  this.isformTypeUpdate = false;
                  this.taskform.reset();
                } else {
                  alert('something went wrong');
                }
              },
              error: (err) => {
                alert(err);
              },
            });
        }
      } else {
        console.log('Form is invalid');
      }
    }
  }

  checkDeadlineValid() {
    const now = moment();
    const deadline = moment(this.taskform.value.deadline);
    if (deadline.isBefore(now)) {
      return true;
    } else {
      return false;
    }
  }
}
