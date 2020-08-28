import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private auth: AuthService,
                private router: Router ){}

  canActivate():boolean{
    
    if (this.auth.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
//esto es un simple servicio, la diferencia es que implementa el can actvate que ejecuta la confirmacion de la ruta :v osea validar la ruta para que no se metan sin permiso