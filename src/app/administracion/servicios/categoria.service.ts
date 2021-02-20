import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { respuestaApi } from 'src/app/modelosGobales/respuestaApi.model';
import { MensajesToastService } from 'src/app/utilidades/mensajes-toast.service';
import { environment } from 'src/environments/environment';
import { Categoria } from '../modelos/categorias.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
    private _mensajesToastService: MensajesToastService
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

  public obtenerCategorias(params: any={} ): Promise<Categoria[]> {
    this.inicioCargando();
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + 'categoria')
        .pipe(
          catchError((e: HttpErrorResponse) => {
            this._mensajesToastService.mostrarMensajesHttp(e?.error);
            this.finalCargando();
            reject('No se pudo cargar las categorias ' + e.error);
            return EMPTY;
          })
        )
        .subscribe((res: respuestaApi | any) => {
          resolve(res.datos);
          this.finalCargando();
        });

    });
  }

  public guardarCategoria(params: any = null): any {
    this.inicioCargando();
    this.http.post(environment.apiUrl + 'categoria', params)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this._mensajesToastService.mostrarMensajesHttp(e?.error);
          this.finalCargando();
          return EMPTY;
        })
      )
      .subscribe((res: respuestaApi | any) => {
        this._mensajesToastService.exito('Se guardo correctamente');
        this.finalCargando();
      });
  }


  public editarCategoria(params: any, id: number): any {
    this.inicioCargando();
    this.http.put(environment.apiUrl + 'categoria/' + id, params)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this._mensajesToastService.mostrarMensajesHttp(e?.error);
          this.finalCargando();
          return EMPTY;
        })
      )
      .subscribe((res: respuestaApi | any) => {
        this._mensajesToastService.exito('Se actualizo correctamente');
        this.finalCargando();
      });
  }


  public eliminarProducto(id: number): any {
    this.inicioCargando();
    this.http.delete(environment.apiUrl + 'categoria/' + id)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this._mensajesToastService.mostrarMensajesHttp(e?.error);
          this.finalCargando();
          return EMPTY;
        })
      )
      .subscribe((res: respuestaApi | any) => {
        this._mensajesToastService.exito('Se eliminó correctamente');
        this.finalCargando();
      });
  }
}
