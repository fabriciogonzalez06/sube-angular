export interface Productos{
  id:number;
  nombre:string;
  descripcion:string;
  estado:boolean;
  precio:number;
  imagen:string;
  idCategoria:number;
  creadoPor:number;
  created_at:string | Date;
  updated_at:string | Date;
  nombreCategoria:string;
}
