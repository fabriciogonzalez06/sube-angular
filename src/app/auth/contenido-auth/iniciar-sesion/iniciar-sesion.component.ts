import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { AuthService } from '../../servicios/auth.service';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss'],

  providers:[
    ConfirmationService,
    MessageService
  ]
})
export class IniciarSesionComponent implements OnInit,OnDestroy {

  constructor(
    private _authService:AuthService,
    private fb:FormBuilder,
  ) {
    this.frmIniciarSesion= this.fb.group({
       correo:["",[Validators.required,Validators.email]],
       contrasena:["",[Validators.required]]
    });
    this.subscripciones= new Subscription();
    this.cargando=false;
  }

  private subscripciones:Subscription;
  public cargando:boolean;

  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }

  public frmIniciarSesion:FormGroup;

  ngOnInit(): void {
    this._authService.cargando$.subscribe(cargando=>{
      this.cargando=cargando;
    });
  }

  public iniciarSesion():void{
    if(this.frmIniciarSesion.invalid){
      this.frmIniciarSesion.markAllAsTouched()
      return;
    }
    this._authService.iniciarSesion({json:JSON.stringify({...this.frmIniciarSesion.value}) });
  }

}
