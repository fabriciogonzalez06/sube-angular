import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImagen'
})
export class NoImagenPipe implements PipeTransform {

  transform(imagen:string): any {

    if(!imagen || imagen===null || imagen===undefined){
      return 'assets/imagenes/noImage.jpg';
    }else{
      return imagen;
    }

  }

}
