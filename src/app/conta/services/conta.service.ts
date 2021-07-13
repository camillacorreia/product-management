import { Usuario } from './../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: Usuario) {

  }

  login(usuario: Usuario) {

  }
}
