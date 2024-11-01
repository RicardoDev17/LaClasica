import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async register(username: string, password: string) {
    const user = { username, password };
    await this.storage.set(username, user);
    return true;
  }

  async login(username: string, password: string) {
    const user = await this.storage.get(username);
    if (user && user.password === password) {
      return true;
    }
    return false;
  }
}
