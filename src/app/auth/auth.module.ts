import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IniciarSesionComponent } from './contenido-auth/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './contenido-auth/registro/registro.component';
import { AuthNgPrimeModule } from './auth-NgPrime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContenidoAuthComponent } from './contenido-auth/contenido-auth.component';
import { ComercioModule } from '../comercio/comercio.module';
import { CompartidoModule } from '../compartido/compartido.module';


@NgModule({
  declarations: [IniciarSesionComponent, RegistroComponent, ContenidoAuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthNgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    ComercioModule,
    CompartidoModule,
  ]
})
export class AuthModule { }
