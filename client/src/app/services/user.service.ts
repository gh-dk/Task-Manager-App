import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { Task } from '../classes/task';
import { ToastrService } from 'ngx-toastr';

interface ResponseTokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  SERVER_URL = 'http://localhost:3000/user';
  userData: User = new User();

  public backlogTask: Task[] = [];
  public todoTask: Task[] = [];
  public ongoingTask: Task[] = [];
  public doneTask: Task[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public toastr: ToastrService
  ) {}

  // category the task
  categorizeTask() {
    //backlog
    // console.log(this.userData.tasks);

    this.backlogTask = (this.userData.tasks as Task[]).filter(
      (task: Task) => task.stage == 0
    );
    this.backlogTask.sort((task1, task2) => task2.priority - task1.priority);
    // console.log(this.backlogTask);

    //todo
    this.todoTask = (this.userData.tasks as Task[]).filter(
      (task: Task) => task.stage == 1
    );
    this.todoTask.sort((task1, task2) => task2.priority - task1.priority);
    // console.log(this.todoTask);

    //ongoing
    this.ongoingTask = (this.userData.tasks as Task[]).filter(
      (task: Task) => task.stage == 2
    );
    this.ongoingTask.sort((task1, task2) => task2.priority - task1.priority);

    //done
    this.doneTask = (this.userData.tasks as Task[]).filter(
      (task: Task) => task.stage == 3
    );
    this.doneTask.sort((task1, task2) => task2.priority - task1.priority);
  }

  addUser(formUserData: User) {
    const form = new FormData();
    form.append('username', formUserData.username);
    form.append('email', formUserData.email);
    form.append('contact', formUserData.contact.toString());
    form.append('password', formUserData.password);
    form.append('profilePic', formUserData.profilePic);

    console.log(form);

    const myReq = this.http.post(this.SERVER_URL + '/register', form);
    myReq.subscribe({
      next: (success) => {
        const data = success as ResponseTokens;
        console.log(success);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        this.userData = data.user;
        console.log(this.userData);
        this.toastr.success('Account Created Successfully');
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  loginUser(formUserData: User) {
    const myReq = this.http.post(this.SERVER_URL + '/login', {
      email: formUserData.email,
      password: formUserData.password,
    });
    myReq.subscribe({
      next: (success) => {
        const data = success as ResponseTokens;
        console.log(success);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        this.userData = data.user;
        console.log(this.userData);
        this.toastr.success('User LoggedIn Successfully')
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  updateUser(formUserData: User) {
    const form = new FormData();
    form.append('username', formUserData.username);
    // form.append('email', formUserData.email);
    form.append('contact', formUserData.contact.toString());
    // form.append('password', formUserData.password);
    if (formUserData.profilePic != '')
      form.append('profilePic', formUserData.profilePic);

    form.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    const myReq = this.http.put<{ message: string; user: User }>(
      this.SERVER_URL + '/update/' + this.userData._id,
      form
    );
    myReq.subscribe({
      next: (success) => {
        if (success.user) {
          this.userData = success.user;
          this.toastr.success(success.message);
          // this.router.navigate(['../dashboard']);
          setInterval(() => {
            window.location.reload();
          }, 500);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  userLogout() {
    const confirmLogout = confirm('Are you sure you want to log out');
    if (confirmLogout) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/login']);
      this.toastr.success('Logout successfully');
    }
  }

  toUrl(data: any) {
    let profilePicBuffer = data.data.data;
    return `data:image/jpeg;base64,${btoa(
      profilePicBuffer?.reduce(
        (data: any, byte: any) => data + String.fromCharCode(byte),
        ''
      )
    )}`;
  }
}
