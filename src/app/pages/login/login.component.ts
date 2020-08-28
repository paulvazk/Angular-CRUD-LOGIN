import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from '../../../assets/js/sweetalert2.all.min.js'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:  UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, 
    private router: Router ) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email')
      this.recordarme = true;
    }

  }
 
  login( form:NgForm ){

  if ( form.invalid ) { return; }
  Swal.fire({
    allowOutsideClick: false, 
    icon: 'info', 
    text: 'Espera por Favor..'
  });

  Swal.showLoading();
    

    this.auth.login(this.usuario)
    .subscribe(
      resp => {
        console.log(resp);
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        } else {
           localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/home');

      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error', 
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      }
    )
  }
}
