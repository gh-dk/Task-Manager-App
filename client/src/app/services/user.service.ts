import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Router } from '@angular/router';

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

  constructor(public http: HttpClient, public router: Router) { }

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

        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loginUser(formUserData: User) {
    const form = new FormData();
    form.append('email', formUserData.email);
    // form.append('email', formUserData.email);
    form.append('password', formUserData.password);

    console.log(form, formUserData.email, formUserData.password);

    const myReq = this.http.post(this.SERVER_URL + '/login', { email: formUserData.email, password: formUserData.password });
    myReq.subscribe({
      next: (success) => {
        const data = success as ResponseTokens;
        console.log(success);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        this.userData = data.user;
        console.log(this.userData);

        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
