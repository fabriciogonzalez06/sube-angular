import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SetHeaderService } from 'src/app/interceptors/set-header.service';
import { respuestaApi } from 'src/app/modelosGobales/respuestaApi.model';
import { MensajesToastService } from 'src/app/utilidades/mensajes-toast.service';
import { environment } from 'src/environments/environment';
import { Productos } from '../modelos/productos.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient,
    private _mensajesToastService: MensajesToastService,
    private _setHeaderService:SetHeaderService
  ) {
    this.cargandoBs = new BehaviorSubject<boolean>(false);
  }

  private cargandoBs: BehaviorSubject<boolean>;
  public get cargando$(): Observable<boolean> {
    return this.cargandoBs.asObservable();
  }

  private inicioCargando() {
    this.cargandoBs.next(true);
  }
  private finalCargando() {
    this.cargandoBs.next(false);
  }

  public obtenerProductos(params: any ): Promise<Productos[]> {
    this.inicioCargando();
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + 'producto/listar', params)
        .pipe(
          catchError((e: HttpErrorResponse) => {
            this._mensajesToastService.mostrarMensajesHttp(e?.error);
            this.finalCargando();
            reject('No se pudo cargar los productos ' + e.error);
            return EMPTY;
          })
        )
        .subscribe((res: respuestaApi | any) => {
          resolve(res.datos);
          this.finalCargando();
        });

    });
  }

  public guardarProducto(params: FormData): Promise<Productos> {
    this.inicioCargando();
    return new Promise((resolve,reject)=>{

      this.http.post(environment.apiUrl + 'producto', params,{headers:this._setHeaderService.putTokenHeader()})
        .pipe(
          catchError((e: HttpErrorResponse) => {
            this._mensajesToastService.mostrarMensajesHttp(e?.error);
            this.finalCargando();
            reject('no se pudo guardar el producto '+e.message);
            return EMPTY;
          })
        )
        .subscribe((res: respuestaApi | any) => {
          this._mensajesToastService.exito('Se guardo correctamente');
          this.finalCargando();
          resolve(res.datos[0]);
        });
    });
  }


  public editarProducto(params: any, id: number): any {
    return new Promise((resolve,reject)=>{

      this.inicioCargando();
      this.http.put(environment.apiUrl + 'producto/' + id, params,{headers:this._setHeaderService.putTokenHeader()})
        .pipe(
          catchError((e: HttpErrorResponse) => {
            this._mensajesToastService.mostrarMensajesHttp(e?.error);
            this.finalCargando();
            reject('no se pudo editar producto '+e.message);
            return EMPTY;
          })
        )
        .subscribe((res: respuestaApi | any) => {
          this._mensajesToastService.exito('Se actualizo correctamente');
          this.finalCargando();
          resolve(res.datos[0]);
        });
    });
  }
  public actuailzarImagen(imagen: any, id: number): Promise<Productos> {
    this.inicioCargando();
    return new Promise((resolve,reject)=>{

      const params= new FormData();
      params.append('imgProducto',imagen);
      this.http.post(environment.apiUrl + 'producto/imagen/' + id, params,{headers:this._setHeaderService.putTokenHeader()})
        .pipe(
          catchError((e: HttpErrorResponse) => {
            this._mensajesToastService.mostrarMensajesHttp(e?.error);
            this.finalCargando();
            reject('No se pudo actualizar la imagen '+e.message);
            return EMPTY;
          })
        )
        .subscribe((res: respuestaApi | any) => {
          this._mensajesToastService.exito('Se actualizo correctamente');

          this.finalCargando();
          resolve(res.datos[0]);
        });
    });
  }


  public eliminarProducto(id: number,params:any): Promise<number> {
    return new Promise((resolve,reject)=>{

      this.inicioCargando();
      this.http.request('DELETE',environment.apiUrl + 'producto/' + id,{headers:this._setHeaderService.putTokenHeader(),params})
        .pipe(
          catchError((e: HttpErrorResponse) => {
            this._mensajesToastService.mostrarMensajesHttp(e?.error);
            this.finalCargando();
            reject('No se pudo eliminar el producto'+e.message);
            return EMPTY;
          })
        )
        .subscribe((res: respuestaApi | any) => {
          this._mensajesToastService.exito('Se eliminó correctamente');
          this.finalCargando();
          resolve(id);
        });
    })
  }


}
