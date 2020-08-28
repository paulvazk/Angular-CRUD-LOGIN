import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuarios.model';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: String = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey: String = 'AIzaSyDhYNO-r19fOFBIZn3RRWz1KKG2vAscjRE';
  userToken : string;
  //Crear Nuevo Usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http: HttpClient ) { 
    this.leerToken();
  }
  logout(){
    localStorage.removeItem('token');
  }
  login( usuario: UsuarioModel ){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );


  }
  nuevoUsuario( usuario: UsuarioModel ){
  
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira ', hoy.getTime().toString());
  }
  
  leerToken(){
    if (localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
  //metodos
  estaAutenticado() : boolean{
   return this.userToken.length > 2;   
  }
}
