import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USUARIO_ACTUAL } from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class SetHeaderService {

  constructor() { }

  putTokenHeader(){
    const usuarioActual = JSON.parse(localStorage.getItem(USUARIO_ACTUAL)||'');
    return new HttpHeaders().set('Authorization',usuarioActual.token);
  }
}
