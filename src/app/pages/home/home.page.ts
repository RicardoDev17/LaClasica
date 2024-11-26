import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private authService: AuthService, private router: Router) {}

  // Método logout
  async logout() {
    await this.authService.logout();  // Llamar al servicio de logout
    this.router.navigateByUrl('/login');  // Redirigir al login después de cerrar sesión
  }
}
