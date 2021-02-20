import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MensajesContactanos } from 'src/app/comercio/modelos/contactanos.model';
import { MensajesService } from '../../servicios/mensajes.service';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit,OnDestroy {




  public mensajes: MensajesContactanos[];
  private subscripciones:Subscription;
  public cargando:boolean;

  constructor(
    private _mensajesService:MensajesService
  ) {

    this.mensajes = [];
    this.elementosBreadcrumb = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/administracion' },
      { label: 'Preguntas', icon: 'pi pi-question' },
    ];
    this.subscripciones= new Subscription();
    this.cargando=false;

  }

  public elementosBreadcrumb: MenuItem[];
  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }

  ngOnInit() {
    // this.productService.getProducts().then(data => this.products = data);
    this.subscripciones.add(
      this._mensajesService.cargando$.subscribe(res=>this.cargando=res)
    );
    this.obtenerMensajes();

  }

  public obtenerMensajes(){
      this._mensajesService.obtenerMensajes().then(res=>{
        this.mensajes= res;
        console.log('mensajes ',res)
      }).catch(console.error);
  }
}
