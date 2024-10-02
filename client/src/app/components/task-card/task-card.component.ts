import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() bgColor: string = 'bg-white';
  bgOpacity: string = 'bg-opacity-[2%]'
  textColor: string = 'text-' + this.bgColor.split('bg-')[1]
}
