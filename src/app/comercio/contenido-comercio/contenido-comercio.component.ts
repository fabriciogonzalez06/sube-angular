import { Component, OnInit } from '@angular/core';
import { AuthUsuario } from 'src/app/auth/modelos/auth.model';
import { AuthService } from 'src/app/auth/servicios/auth.service';

@Component({
  selector: 'app-contenido-comercio',
  templateUrl: './contenido-comercio.component.html',
  styleUrls: ['./contenido-comercio.component.scss']
})
export class ContenidoComercioComponent implements OnInit {

  constructor(
    public  _authService:AuthService
  ) {
    this.usuarioLogueado={} as AuthUsuario;
  }

  public usuarioLogueado:AuthUsuario;

  ngOnInit(): void {
   this.usuarioLogueado=this._authService.obtenerDatosTokenLocalStorage();
  }


}
