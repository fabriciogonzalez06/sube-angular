import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MensajesContactanos } from 'src/app/comercio/modelos/contactanos.model';
import { SetHeaderService } from 'src/app/interceptors/set-header.service';
import { respuestaApi } from 'src/app/modelosGobales/respuestaApi.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(
    private http: HttpClient,
    private _sht :SetHeaderService
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

  private finCargando() {
    this.cargandoBs.next(false);
  }


  public obtenerMensajes():Promise<MensajesContactanos[]> {
    this.inicioCargando();
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + 'contactanos',{headers:this._sht.putTokenHeader()})
        .pipe(
          catchError((e: HttpErrorResponse) => {
            this.finCargando();
            reject('No se pudieron cargar los mensajes ' + e.message);
            return EMPTY;
          })
        )
        .subscribe((res: respuestaApi | any) => {
          this.finCargando();
          resolve(res.datos);
        });
    });
  }

}
