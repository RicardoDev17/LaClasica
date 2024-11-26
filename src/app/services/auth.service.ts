import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Método para simular un login
  async login(email: string, password: string): Promise<boolean> {
    const users = await this.getUsers();
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);

    if (user) {
      await Storage.set({ key: 'user', value: JSON.stringify({ email }) });
      return true;
    }
    return false;
  }

  // Método para registrar un nuevo usuario
  async register(email: string, password: string): Promise<boolean> {
    const users = await this.getUsers();
    const userExists = users.some((u: { email: string }) => u.email === email);

    if (userExists) {
      return false;
    }

    users.push({ email, password });
    await Storage.set({ key: 'users', value: JSON.stringify(users) });
    return true;
  }

  // Método para obtener los usuarios registrados
  private async getUsers(): Promise<any[]> {
    const { value } = await Storage.get({ key: 'users' });
    return value ? JSON.parse(value) : [];
  }

  // Método para obtener el usuario actual
  async getUser(): Promise<any> {
    const { value } = await Storage.get({ key: 'user' });
    return value ? JSON.parse(value) : null;
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    await Storage.remove({ key: 'user' });
  }
}
