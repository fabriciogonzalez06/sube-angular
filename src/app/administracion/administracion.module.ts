import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { ProductosComponent } from './content-administracion/productos/productos.component';
import { CategoriasComponent } from './content-administracion/categorias/categorias.component';
import { PreguntasComponent } from './content-administracion/preguntas/preguntas.component';
import { AdministracionNgPrimeModule } from './administracion-NgPrime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContentAdministracionComponent } from './content-administracion/content-administracion.component';
import { CompartidoModule } from '../compartido/compartido.module';
import { PipesModule } from '../pipes/pipes.module';
import { AdminDashboardComponent } from './content-administracion/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [ProductosComponent, CategoriasComponent, PreguntasComponent, ContentAdministracionComponent,AdminDashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdministracionRoutingModule,
    AdministracionNgPrimeModule,
    CompartidoModule,
    PipesModule,

  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class AdministracionModule { }
