import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactanosService } from '../../servicios/contactanos.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss']
})
export class ContactanosComponent implements OnInit, OnDestroy {

  constructor(
    private _contactanosService: ContactanosService,
    private fb: FormBuilder
  ) {
    this.frmMensaje = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      mensaje: ['', [Validators.required]],
    });

    this.cargando = false;
    this.subscripciones = new Subscription();
  }

  public cargando: boolean;
  public frmMensaje: FormGroup;
  private subscripciones: Subscription;

  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();

  }

  ngOnInit(): void {
    this.subscripciones.add(
      this._contactanosService.cargando$.subscribe(res => this.cargando = res)
    );
  }

  public guardarMensaje() {

      if(this.frmMensaje.invalid){
        this.frmMensaje.markAllAsTouched();
        return;
      }

      this._contactanosService.guardarMensaje({json:JSON.stringify({...this.frmMensaje.value})});
      this.frmMensaje.reset();
  }

}
