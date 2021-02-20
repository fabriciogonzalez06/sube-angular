import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/servicios/auth.service';
import { MensajesToastService } from '../utilidades/mensajes-toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private _authService:AuthService,
    // private _mensajesToastService:MensajesToastService
  ) { }

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

      const token = this._authService.obtenerToken();

      let request=req;
      console.log(request)

      // if(token){
        // request= req.clone({
        //   setHeaders:{
        //     Authorization:token
        //   }
        // });
      // }

      return next.handle(request).pipe(
        catchError((e:HttpErrorResponse)=>{
          if(e.status===401){
            this._authService.cerrarCesion();
            // this._mensajesToastService.informacion('Su sesión ha finalizado, ingrese nuevamente por favor.');
          }
          return throwError(e);
        })
      );

  }
}
