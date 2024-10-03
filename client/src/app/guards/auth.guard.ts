import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';

export function authGuard(): Observable<boolean> {
    const http = inject(HttpClient);
    const router = inject(Router);
    const userService = inject(UserService);

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        router.navigate(['/login']);
        return new Observable<boolean>((observer) => observer.next(false));
    }

    const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
    });

    return http
        .get<{ valid: boolean, user: User }>('http://localhost:3000/user/verifyJWT', { headers })
        .pipe(
            map((response) => {
                if (response.valid) {
                    userService.userData = response.user;
                    console.log(userService.userData.tasks);

                    userService.categorizeTask()
                    return true;
                } else {
                    router.navigate(['/login']);
                    return false;
                }
            }),
            catchError((error) => {
                console.error('Token verification failed:', error);
                router.navigate(['/login']);
                return new Observable<boolean>((observer) => observer.next(false));
            })
        );
}
