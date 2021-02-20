import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComercioRoutingModule } from './comercio-routing.module';
import { ProductosDisponiblesComponent } from './contenido-comercio/productos-disponibles/productos-disponibles.component';
import { ProductoDetalleComponent } from './contenido-comercio/productos-disponibles/producto-detalle/producto-detalle.component';
import { ComercioNgPrimeModule } from './comercio-NgPrime.module';
import { ContactanosComponent } from './contenido-comercio/contactanos/contactanos.component';
import { ContenidoComercioComponent } from './contenido-comercio/contenido-comercio.component';
import { CompartidoModule } from '../compartido/compartido.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [ProductosDisponiblesComponent, ProductoDetalleComponent, ContactanosComponent, ContenidoComercioComponent],
  imports: [
    CommonModule,
    ComercioRoutingModule,
    ComercioNgPrimeModule,
    CompartidoModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports:[ContactanosComponent]
})
export class ComercioModule { }
