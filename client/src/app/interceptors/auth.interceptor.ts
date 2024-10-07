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
  const accessToken = localStorage.getItem('accessToken');
  const toastr = inject(ToastrService);

  if (accessToken) {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return next(cloneReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isRetryAttempted) {
          isRetryAttempted = true;

          const refreshToken = localStorage.getItem('refreshToken');

          return http
            .get<NewResponse>(
              'http://localhost:3000/user/verifyRefreshToken/' + refreshToken
            )
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
                isRetryAttempted = false;
                toastr.error('Session expired. Please log in again.');
                router.navigate(['/login']);
                return throwError(
                  () => new Error('Unauthorized after token refresh attempt')
                );
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
