import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService)
  const authService = inject(AuthService)
  const isLogged = authService.isLoggedIn

  return next(req).pipe(
    catchError((error : HttpErrorResponse)=>{

      if (error.status === 0) {
        toastrService.error('No internet Connection')
      }
      if (isLogged && error.status === 401) {
        toastrService.error('UnAuthorized')
      }

      return throwError(()=> error)
    })
  );
};
