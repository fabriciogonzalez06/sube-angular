import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComercioComponent } from './contenido-comercio/contenido-comercio.component';
import { ProductosDisponiblesComponent } from './contenido-comercio/productos-disponibles/productos-disponibles.component';

const COMERCIO_ROUTES: Routes = [
  {
    path:'',
    component:ContenidoComercioComponent,
    children:[
      {
        path:'',
        component:ProductosDisponiblesComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(COMERCIO_ROUTES)],
  exports: [RouterModule]
})
export class ComercioRoutingModule { }
