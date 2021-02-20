import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate {

  constructor(
    private _authService:AuthService,
    private router:Router
  ){

  }

  canActivate(): Observable<boolean > | Promise<boolean > | boolean | UrlTree {
     const autenticado= this._authService.estaAutenticado();
     if(autenticado){
       return true;
     }else{
        this.router.navigateByUrl('');
        return false;
     }
  }

}
