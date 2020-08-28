import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuarios.model';

import Swal from '../../../assets/js/sweetalert2.all.min.js'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();

  }
  onSubmit( form: NgForm ){
    if ( form.invalid ) { return; }
   
    Swal.fire({
      allowOutsideClick: false, 
      icon: 'info', 
      text: 'Espera por Favor..'
    });



    this.auth.nuevoUsuario( this.usuario )
    .subscribe( resp => {
      console.log('====================================');
      console.log(resp);
      Swal.close();
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      } else {
         localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/home');
      console.log('====================================');
    }, (err) => {
      console.log('====================================');
      console.log(err);
      Swal.fire({
        icon: 'error', 
        title: 'Error al autenticar',
        text: err.error.error.message
      });
      console.log('====================================');
    });

  }

}
