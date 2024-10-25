import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string ='';
  password: string='';
  confirmPassword: string='';

  constructor(private authService: AuthService, private router: Router) {} // Inyecta Router

  register(form: NgForm) {
    if (form.valid && this.password === this.confirmPassword) {
      this.authService.register(this.username, this.password).then(() => {
        // Redirige a la página home después de un registro exitoso
        this.router.navigate(['/login']);
      }).catch((error) => {
        console.error('Error al registrarse:', error);
        // Aquí podrías manejar el error (por ejemplo, mostrar un mensaje al usuario)
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']); // Cambia a la ruta de registro
  }
}
