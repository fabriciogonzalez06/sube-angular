import { NgModule } from '@angular/core';
import { NoImagenPipe } from './no-imagen.pipe';



@NgModule({
  declarations: [NoImagenPipe],
  exports:[
    NoImagenPipe
  ]
})
export class PipesModule { }
