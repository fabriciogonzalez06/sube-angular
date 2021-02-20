import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MensajesToastService } from 'src/app/utilidades/mensajes-toast.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit,OnDestroy {


  constructor(
    public _authService:AuthService,
    private _mensaejesToastService:MensajesToastService,
    private fb:FormBuilder
  ) {
    this.frmRegistro= this.fb.group({
      nombre:['',[Validators.required]],
      correo:['',[Validators.required,Validators.email]],
      contrasena:['',[Validators.required]],
      contrasena2:['',[Validators.required]]
    });
    this.subscripciones= new Subscription();
    this.cargando=true;
   }

   public subscripciones:Subscription;
   public frmRegistro:FormGroup;
   public cargando:boolean;

  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }





  ngOnInit(): void {
    this.subscripciones.add(
      this._authService.cargando$.subscribe(cargando=>this.cargando=cargando)
    );
  }

  public registrar(){



    if(this.frmRegistro.invalid){
      this._mensaejesToastService.alerta('Faltan campos o no cumplen validaciones');
      return;
    }

    const {contrasena,contrasena2}= this.frmRegistro.value;
    if(contrasena!==contrasena2){
      this._mensaejesToastService.alerta('Las contraseñas no coinciden');
      return;
    }

    this._authService.registrar({json:JSON.stringify({...this.frmRegistro.value})});

  }

}
