import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter, skipUntil, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {

  public mostrarSidebar:boolean;

  public usuario:any;
  public usuarioLogueado:any;
  public nombre:string;
  public inicialNombre:string;

  public subscripciones:Subscription;

  constructor(
    public _authService:AuthService,
    private router:Router
  ) {
    this.mostrarSidebar=false;
    this.subscripciones= new Subscription();
    this.nombre='User';
    this.inicialNombre='U';

   }
  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }


  ngOnInit(): void {
    this._authService.usuario$
    .pipe(
      tap(usuario=>{
        this.usuario= usuario;
      }),
      filter(usuario=> usuario && usuario.nombre)
      // skipWhile(usuario=> usuario===null || usuario.nombre ===null || usuario.nombre ===undefined )
    )
    .subscribe(({nombre})=>{
      this.usuarioLogueado=this._authService.obtenerDatosTokenLocalStorage();
      this.nombre= nombre;
      this.inicialNombre= nombre.substr(0,1) ;
    });
    // console.log(this.usuarioLogueado)
  }

  public irInicioSesion(){
    this.router.navigateByUrl('auth/iniciarSesion');

  }

  irInicioComercio(){
      this.router.navigateByUrl('/');
  }
  irInicioAdmin(){
      this.router.navigateByUrl('administracion');
  }


  public irRegistro(){
    this.router.navigateByUrl('auth/registro');
  }

  public cerrarSesion(){
    this._authService.cerrarCesion();
  }

}
