import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Productos } from 'src/app/administracion/modelos/productos.model';
import { ProductoService } from 'src/app/administracion/servicios/producto.service';

@Component({
  selector: 'app-productos-disponibles',
  templateUrl: './productos-disponibles.component.html',
  styleUrls: ['./productos-disponibles.component.scss']
})
export class ProductosDisponiblesComponent implements OnInit, OnDestroy {

  constructor(
    private _productosService: ProductoService
  ) {
    this.productos = [];
    this.cargando = true;
    this.subscripciones = new Subscription();
    this.initSubscriptions();
    this.mostrarModalProducto = false;
    this.productoSeleccionado = {} as Productos;

  }


  public mostrarModalProducto: boolean;
  public productos: Productos[];
  public productoSeleccionado: Productos;
  public cargando: boolean;





  private subscripciones: Subscription;

  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerProductos();

  }

  private initSubscriptions() {
    this.subscripciones.add(
      this._productosService.cargando$.subscribe(res => this.cargando = res)
    );
  };


  public obtenerProductos() {
    this._productosService.obtenerProductos({ json: JSON.stringify({ estado: null, id: null }) }).then(res => {
      this.productos = res;
      console.log(this.productos)
    }).catch(console.error);

  }

  public verProducto(producto: Productos) {
    this.mostrarModalProducto = true;
    this.productoSeleccionado = producto;
  }

}
