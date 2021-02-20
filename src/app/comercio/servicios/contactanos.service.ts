import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { respuestaApi } from 'src/app/modelosGobales/respuestaApi.model';
import { MensajesToastService } from 'src/app/utilidades/mensajes-toast.service';
import { environment } from 'src/environments/environment';
import { MensajesContactanos } from '../modelos/contactanos.model';

@Injectable({
  providedIn: 'root'
})
export class ContactanosService {

  constructor(
    private http: HttpClient,
    private mensajesToastService: MensajesToastService
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

  public obtenerMensajes(params: any = null): Promise<MensajesContactanos[]> {
    this.inicioCargando();
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + 'contactanos')
        .pipe(
          catchError((e: HttpErrorResponse) => {
            this.finalCargando();
            this.mensajesToastService.mostrarMensajesHttp(e?.error);
            reject('No se pudo obtener los datos ' + e.message);
            return EMPTY;
          })
        )
        .subscribe((res: respuestaApi | any) => {
          resolve(res.datos);
          this.finalCargando();
        });
    });
  }


  public guardarMensaje(params: any): void {
    this.inicioCargando();
    this.http.post(environment.apiUrl + 'contactanos', params)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this.finalCargando();
          this.mensajesToastService.mostrarMensajesHttp(e?.error);
          return EMPTY;
        })
      )
      .subscribe((res: respuestaApi | any) => {
        this.mensajesToastService.exito('Se envio correctamente el mensaje');
        this.finalCargando();
      });
  }
}
