import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async login(email: string, password: string): Promise<boolean> {
    const users = await this.getUsers();
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);

    if (user) {
      await Preferences.set({ key: 'user', value: JSON.stringify({ email }) });
      return true;
    }
    return false;
  }

  async register(email: string, password: string): Promise<boolean> {
    const users = await this.getUsers();
    const userExists = users.some((u: { email: string }) => u.email === email);

    if (userExists) {
      return false;
    }

    users.push({ email, password });
    await Preferences.set({ key: 'users', value: JSON.stringify(users) });
    return true;
  }

  private async getUsers(): Promise<any[]> {
    const { value } = await Preferences.get({ key: 'users' });
    return value ? JSON.parse(value) : [];
  }

  async getUser(): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });
    return value ? JSON.parse(value) : null;
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'user' });
  }
}
