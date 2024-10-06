import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const accessToken = localStorage.getItem('accessToken');
  const toastr = inject(ToastrService)

  if (accessToken) {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return next(cloneReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          toastr.error("You are unauthorized. Please try again")
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  } else {
    return next(req);
  }
};
