import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoAuthComponent } from './contenido-auth/contenido-auth.component';
import { IniciarSesionComponent } from './contenido-auth/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './contenido-auth/registro/registro.component';

const AUTH_ROUTES: Routes = [

  {
    path:'',
    component:ContenidoAuthComponent,
    children:[
      {
        path:'iniciarSesion',
        component:IniciarSesionComponent
      },
      {
        path:'registro',
        component:RegistroComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
