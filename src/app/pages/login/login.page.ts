import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = ''; 
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    const result = await this.authService.login(this.username, this.password);
    if (result) {
      // Navegar a la página principal o a donde desees después de iniciar sesión
      this.router.navigate(['/task-form']);
    } else {
      // Manejar el error de login
      console.error('Error en el login');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']); // Cambia a la ruta de registro
  }
}
