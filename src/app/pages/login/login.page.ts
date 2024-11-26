import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    if (!this.email || !this.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const success = await this.authService.login(this.email, this.password);
    if (success) {
      alert('Inicio de sesión exitoso');
      this.router.navigateByUrl('/assign-task'); // Cambia '/home' por '/assign-task'
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  }
}
