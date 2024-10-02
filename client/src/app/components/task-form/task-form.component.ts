import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskFormState: boolean = false;
  taskform: FormGroup;
  constructor() {
    this.taskform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      stage: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required])

    })
  }
  openTaskForm() {
    this.taskFormState = !this.taskFormState;
  }

}
