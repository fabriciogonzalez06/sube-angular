import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MensajesToastService {

  constructor(
    private toastr: ToastrService
  ) { }



  exito(mensaje: string) {
    this.toastr.success(mensaje, 'Mensaje');
  }
  informacion(mensaje: string) {
    this.toastr.info(mensaje, 'Mensaje');
  }
  alerta(mensaje: string) {
    this.toastr.warning(mensaje, 'Mensaje');
  }
  error(mensaje: string) {
    this.toastr.error(mensaje, 'Mensaje');
  }

  mostrarMensajesHttp(e: any) {
    try {
      const { codigoEstado, errores } = e;
      console.log('errores', errores)
      const [{ mensaje }] = errores;


      switch (codigoEstado) {
        case 400:
          if (!mensaje) {
            for (const em of errores) {
              for (const obj in em) {
                  this.toastr.warning(obj+' '+ em[obj][0],'Mensaje')

              }
            }
          }else{

            this.toastr.warning(mensaje, 'Mensaje');
          }

          break;
        case 500:
          this.toastr.error(mensaje, 'Mensaje');
          break;

        default:
          this.toastr.error('Ocurrio un error interno', 'Mensaje');
          break;
      }


    } catch (error) {
      console.error(error.message);
    }
  }
}
