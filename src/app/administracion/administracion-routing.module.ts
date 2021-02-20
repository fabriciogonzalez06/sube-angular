import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadoGuard } from '../auth/guards/autenticado.guard';
import { SoloAdminGuard } from '../auth/guards/solo-admin.guard';
import { AdminDashboardComponent } from './content-administracion/admin-dashboard/admin-dashboard.component';
import { CategoriasComponent } from './content-administracion/categorias/categorias.component';
import { ContentAdministracionComponent } from './content-administracion/content-administracion.component';
import { PreguntasComponent } from './content-administracion/preguntas/preguntas.component';
import { ProductosComponent } from './content-administracion/productos/productos.component';

const ADMINISTRACION_ROUTES: Routes = [
  {
    path:'',
    component:ContentAdministracionComponent,
    canActivate:[AutenticadoGuard, SoloAdminGuard],
    children:[
      {
        path:'',
        component:AdminDashboardComponent
      },
      {
        path:'productos',
        component:ProductosComponent
      },
      {
        path:'categorias',
        component:CategoriasComponent
      },
      {
        path:'preguntas',
        component:PreguntasComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(ADMINISTRACION_ROUTES)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
