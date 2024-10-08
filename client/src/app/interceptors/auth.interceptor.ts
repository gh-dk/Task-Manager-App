import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

interface NewResponse {
  refreshToken: string;
  accessToken: string;
  valid: boolean;
}

let isRetryAttempted = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const toastr = inject(ToastrService);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken) {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken} ${refreshToken}`,
      },
    });

    return next(cloneReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isRetryAttempted) {
          isRetryAttempted = true;
          // const refreshToken = localStorage.getItem('refreshToken');
          return http
            .get<NewResponse>('http://localhost:3000/user/verifyRefreshToken/')
            .pipe(
              switchMap((response) => {
                console.log('Access token refreshed successfully');

                localStorage.setItem('accessToken', response.accessToken);

                const newCloneReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.accessToken}`,
                  },
                });

                isRetryAttempted = false;

                return next(newCloneReq);
              }),
              catchError((refreshError) => {
                console.log('im inter', refreshError);
                if (refreshError.status == 400) {
                  toastr.error(refreshError.error.message);
                } else if (refreshError.status == 403) {
                  isRetryAttempted = false;
                  toastr.error('Session expired. Please log in again.');
                  router.navigate(['/login']);
                  return throwError(
                    () => new Error('Unauthorized after token refresh attempt')
                  );
                } else if (refreshError.status == 401) {
                  toastr.error('Session expired. Please log in again.');
                  router.navigate(['/login']);
                }
                return throwError(() => {});
              })
            );
        }

        return throwError(() => error);
      })
    );
  } else {
    return next(req);
  }
};
