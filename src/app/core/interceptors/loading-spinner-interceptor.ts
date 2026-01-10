import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService =inject(NgxSpinnerService )
  if(req.urlWithParams.includes('products')) return next(req)
  ngxSpinnerService.show()
  return next(req).pipe(
    finalize(()=>{
      ngxSpinnerService.hide()
    })
  );
};
