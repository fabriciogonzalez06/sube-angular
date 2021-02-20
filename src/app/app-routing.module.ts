import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadoGuard } from './auth/guards/autenticado.guard';
import { NoAutenticadoGuard } from './auth/guards/no-autenticado.guard';

const  MAIN_ROUTES: Routes = [

  {
    path:'',
    loadChildren:()=>import('./comercio/comercio.module').then(m=>m.ComercioModule)
  },
  {
    path:'auth',
    canActivate:[NoAutenticadoGuard],
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'administracion',
    canActivate:[AutenticadoGuard],
    loadChildren:()=>import('./administracion/administracion.module').then(m=>m.AdministracionModule)
  },
  {
    path:'**',
    redirectTo:'administracion',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(MAIN_ROUTES,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
