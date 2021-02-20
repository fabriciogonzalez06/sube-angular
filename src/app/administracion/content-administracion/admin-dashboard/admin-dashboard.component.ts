import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private router:Router
  ) {
    this.dashboard=[

      {
        nombre:'Productos',
        imagen:'assets/imagenes/productos.png',
        descripcion:'Administrar productos',
        ruta:'administracion/productos'
      },
      {
        nombre:'Mensajes',
        imagen:'assets/imagenes/mensajes.png',
        descripcion:'Administrar mensajes enviados por clientes.',
        ruta:'administracion/preguntas'
      },
      {
        nombre:'Vista productos',
        imagen:'assets/imagenes/tienda.jpg',
        descripcion:'Ver la vista de productos',
        ruta:'/'
      }
    ];
  }

  public dashboard:any[];

  ngOnInit(): void {
  }

  public irRuta(obj:any){
    this.router.navigateByUrl(obj.ruta);
  }

}
