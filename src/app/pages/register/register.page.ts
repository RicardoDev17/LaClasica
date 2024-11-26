import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptPrivacyPolicy: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    // Validación de Contraseñas
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Validación de Aviso de Privacidad
    if (!this.acceptPrivacyPolicy) {
      alert('Debes aceptar el aviso de privacidad.');
      return;
    }

    // Intentar registro
    const success = await this.authService.register(this.email, this.password);
    if (success) {
      alert('Registro exitoso');
      this.router.navigateByUrl('/login');
    } else {
      alert('El correo ya está registrado.');
    }
  }
}
