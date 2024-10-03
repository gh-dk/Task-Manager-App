import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(public userService: UserService) { }
  openSideBar() {
    const sidebar = document.getElementById('default-sidebar');
    if (sidebar)
      sidebar.classList.toggle('-translate-x-full');
  }
}
