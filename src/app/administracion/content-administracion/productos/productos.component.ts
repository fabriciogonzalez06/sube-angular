import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MensajesToastService } from 'src/app/utilidades/mensajes-toast.service';
import { Categoria } from '../../modelos/categorias.model';
import { Productos } from '../../modelos/productos.model';
import { CategoriaService } from '../../servicios/categoria.service';
import { ProductoService } from '../../servicios/producto.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit, OnDestroy {


  productDialog: boolean;

  productos: Productos[];


  public imagenSubir: any;

  public imagenTemp: any;

  producto: any;
  categoriaSeleccionanda: any;

  submitted: boolean;

  categorias: any[];

  public cargando: boolean;
  public subscipciones: Subscription;

  constructor(
    private _categoriaService: CategoriaService,
    private _productos: ProductoService,
    private _mensajesToastService: MensajesToastService,
    private confirmationService: ConfirmationService) {
    this.productDialog = false;
    this.productos = [];
    this.submitted = false;
    this.categorias = [];
    this.cargando = true;
    this.subscipciones = new Subscription();
    this.elementosBreadcrumb = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/administracion' },
      { label: 'Productos', icon: 'pi pi-product' },
    ];
    this.categorias = [];


  }

  public elementosBreadcrumb: MenuItem[];


  ngOnDestroy(): void {
    this.subscipciones.unsubscribe();
  }

  ngOnInit() {

    this.subscipciones.add(
      this._categoriaService.cargando$.subscribe(res => this.cargando = res)
    );

    this.subscipciones.add(
      this._productos.cargando$.subscribe(res => this.cargando = res)
    );

    this.obtenerProductos();
    this.obtenerCategorias();
  }

  public obtenerCategorias(): void {
    this._categoriaService.obtenerCategorias().then(cate => {
      // this.categorias=cate;
      for (const c of cate) {
        this.categorias.push({ label: c.nombre, idCategoria: c.id })
      }
    }).catch(console.error);
  }

  public obtenerProductos() {
    this._productos.obtenerProductos({ json: JSON.stringify({ id: null, estado: 1 }) }).then(pro => {
      this.productos = pro;
    }).catch(console.error);
  }


  public elegirImagen() {
    document.getElementById("imgproducto")?.click();
  }

  seleccionImagen(archivo: File) {

    //si cancela la carga
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    //validacion basica si no es una imagen
    if (archivo.type.indexOf('image') < 0) {
      this._mensajesToastService.informacion('Solo se permiten imagenes');
      return;
    }

    this.imagenSubir = archivo;

    //javascript puro
    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

    if (this.producto.id && this.imagenSubir) {
      this.actualizarImagen();
      // this.imagenSubir=null;
      // this.imagenTemp=null;
      // this.producto.img=null;
    }

  }

  openNew() {
    this.producto = {};
    this.submitted = false;
    this.productDialog = true;
  }


  editProduct(product: any) {
    this.producto = { ...product };
    this.productDialog = true;
  }

  actualizarImagen() {
    if (this.imagenSubir && this.producto.id) {
      this._productos.actuailzarImagen(this.imagenSubir, this.producto.id).then(producto => {
        this.productos = this.productos.map(p => {
          if (p.id === producto.id) {
            p = producto;
          }
          return p;
        });
      });
    }
  }

  borrarProducto(event: any, producto: Productos) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Seguro que desea eliminar ' + producto.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._productos.eliminarProducto(producto.id, { json: JSON.stringify({ soloDesactivar: false }) }).then(idEliminado => {
          this.productos = this.productos.filter(p => p.id !== idEliminado);
          this.producto = {};
        });
      }
    });
  }

  ocultarDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  actualizarProducto(event: any){
    this.confirmationService.confirm({
      target: event?.target,
      message: 'desea actualizar el producto ' +this.producto.nombre+'?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.productDialog = false;

        this._productos.editarProducto({json:JSON.stringify({...this.producto,soloEstado:false})},this.producto.id).then((producto: Productos) => {

          this.productos = this.productos.map(p=>{
            if(p.id===producto.id){
              p=producto;
            }
            return p;
          });
          this.producto = {};
        }).catch(console.error);

      },

    });
  }

  guardarProducto(event: any) {
    // this.submitted = true;
    this.confirmationService.confirm({
      target: event?.target,
      message: 'desea guardar el producto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.productDialog = false;
        const formData = new FormData();
        formData.append('imgProducto', this.imagenSubir);
        formData.append('json', JSON.stringify(this.producto));

        this._productos.guardarProducto(formData).then((producto: Productos) => {

          this.productos = [...this.productos, producto];
          this.producto = {};
        }).catch(console.error);

      },

    });


  }



}
