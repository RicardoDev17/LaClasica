import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PushNotificationService } from '../../services/push-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth, private pushNotificationService: PushNotificationService) {}

  ngOnInit() {
    // Solicita permisos de notificación
    this.pushNotificationService.requestPermission();
  
    // Escucha mensajes push
    this.pushNotificationService.listen();
 
  }

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

  // Método para mostrar una notificación básica
  mostrarNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('¡Hola desde GymApp!', {
        body: 'Esta es una notificación de prueba.',
      });
    } else {
      console.log('No se puede mostrar la notificación. Permiso no concedido.');
      }
    }
}


