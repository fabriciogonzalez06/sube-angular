import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SoloAdminGuard implements CanActivate {

  constructor(
    private _authService:AuthService,
    private router:Router
  ){}

  canActivate(): Observable<boolean > | Promise<boolean > | boolean  {
    const usuario= this._authService.obtenerDatosTokenLocalStorage();
    if(usuario?.idRol===1){
      return true
    }else{
      this.router.navigateByUrl('');
      return false;
    }
  }

}
