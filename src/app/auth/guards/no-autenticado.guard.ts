import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAutenticadoGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private  router:Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.estaAutenticado()) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }

}
