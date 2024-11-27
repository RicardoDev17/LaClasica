import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.requestPermission();
  }

  async requestPermission() {
    try {
      const permission = await LocalNotifications.requestPermissions();

      // Verifica si el permiso fue concedido
      if (permission?.display === 'granted') {
        console.log('Permiso para notificaciones concedido');
      } else {
        console.log('Permiso para notificaciones denegado');
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
    }
  }
}
