import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { USUARIO_ACTUAL } from 'src/app/constantes';
import jwt_decode from "jwt-decode";
import { AuthUsuario } from '../modelos/auth.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { MensajesToastService } from 'src/app/utilidades/mensajes-toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router:Router,
    private mostarMensajesHttp: MensajesToastService
  ) {
    this.cargandoBs = new BehaviorSubject<boolean>(false);
    this.usuarioBs = new BehaviorSubject<any>(this.obtenerUsuarioActual());

    //cuando se inyecte y recarge el navegador
    this.establecerUsuarioActual();
  }


  private usuarioBs: BehaviorSubject<any>;

  public get usuario$(): Observable<any> {
    return this.usuarioBs.asObservable();
  }


  private cargandoBs: BehaviorSubject<boolean>;
  private inicioCargando() { this.cargandoBs.next(true) };
  private finalCargando() { this.cargandoBs.next(false) };

  public get cargando$(): Observable<boolean> {
    return this.cargandoBs.asObservable();
  }


  public iniciarSesion(params: any): void {
    console.log(params)
    this.inicioCargando();
    this.http.post(environment.apiUrl + 'usuario/inicioSesion', params)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this.finalCargando();
          this.mostarMensajesHttp.mostrarMensajesHttp(e?.error);
          return EMPTY;
        })
      )
      .subscribe((res: any) => {
        this.guardarToken(res['token']);
        this.guardarNombreOCorreo(this.obtenerDatosToken(res['token'])?.nombre || this.obtenerDatosToken(res['token']).correo);
        this.usuarioBs.next(this.obtenerUsuarioActual());
        this.router.navigateByUrl('administracion');
        this.finalCargando();
        this.mostarMensajesHttp.exito('Bienvenido.....');
      });
  }

  public registrar(params: any): void {
    this.inicioCargando();
    this.http.post(environment.apiUrl + 'usuario/registrar', params)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this.finalCargando();
          this.mostarMensajesHttp.mostrarMensajesHttp(e?.error);
          return EMPTY;
        })
      )
      .subscribe((res: any) => {
        this.finalCargando();
        this.mostarMensajesHttp.exito('Usuario creado correctamente');
        this.router.navigateByUrl('/auth/iniciarSesion');

      });
  }

  public cerrarCesion() {
    localStorage.removeItem(USUARIO_ACTUAL);
    this.usuarioBs.next(null);
    this.router.navigateByUrl('');
  }

  private establecerUsuarioActual() {
    try {
      const usuario = JSON.parse(localStorage.getItem(USUARIO_ACTUAL) || '');
      this.usuarioBs.next(usuario);
    } catch (error) {
      this.cerrarCesion();
    }
  }

  public estaAutenticado():boolean{
    try {
      const usuario= JSON.parse(localStorage.getItem(USUARIO_ACTUAL) || '');
      return (!usuario || usuario==='') ? false :true;
    } catch (error) {
      return false;
    }
  }

  public guardarToken(token: string) {
    const usuario = { token, nombre: '' };
    localStorage.setItem(USUARIO_ACTUAL, JSON.stringify(usuario));
    this.usuarioBs.next(usuario);
  }

  public obtenerDatosToken(token: string): AuthUsuario {
    try {
      const decoded: AuthUsuario = jwt_decode(token);
      return decoded;
    } catch (error) {
      this.cerrarCesion();
      return {} as AuthUsuario;
    }
  }

  public obtenerUsuarioActual(){
     return localStorage.getItem(USUARIO_ACTUAL) || null;
  }

  public obtenerDatosTokenLocalStorage(): AuthUsuario {
    try {

      const { token } = JSON.parse(localStorage.getItem(USUARIO_ACTUAL) || '');
      const decoded: AuthUsuario = jwt_decode(token);
      return decoded;
    } catch (error) {
      this.cerrarCesion();
      return {} as AuthUsuario;
    }
  }

  public obtenerToken():string{
    const {token}= JSON.parse(localStorage.getItem(USUARIO_ACTUAL) || '');
    return token;
  }

  public guardarNombreOCorreo(nombre: string) {
    try {
      const usuarioActualJson = JSON.parse(localStorage.getItem(USUARIO_ACTUAL) || '');
      const usuario = { ...usuarioActualJson, nombre };
      localStorage.setItem(USUARIO_ACTUAL, JSON.stringify(usuario));
      this.usuarioBs.next(usuario);

    } catch (error) {
      this.cerrarCesion();
    }
  }

}
