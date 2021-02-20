import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompartidoRoutingModule } from './compartido-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CompartidoNgPrimeModule } from './compartidoNgPrime.module';
import { RouterModule } from '@angular/router';
import { CargandoComponent } from './cargando/cargando.component';
import { SkeletonCardComponent } from './skeleton-card/skeleton-card.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CargandoComponent,
    SkeletonCardComponent
  ],
  imports: [
    CommonModule,
    CompartidoRoutingModule,
    CompartidoNgPrimeModule,
    RouterModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    CargandoComponent,
    SkeletonCardComponent
  ]
})
export class CompartidoModule { }
