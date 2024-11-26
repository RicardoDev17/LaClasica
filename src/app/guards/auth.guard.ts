import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getUser();  // Esperamos la respuesta de getUser()
    if (user) {
      return true;  // Si el usuario está autenticado, permite el acceso
    } else {
      this.router.navigateByUrl('/login');  // Si no está autenticado, redirige al login
      return false;
    }
  }
}
