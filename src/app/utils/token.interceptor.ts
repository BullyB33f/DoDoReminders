import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = localStorage.getItem('authToken'); //RETRIEVING AUTHTOKEN FROM THE LOCAL STROAGE

  const authReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq);
};
