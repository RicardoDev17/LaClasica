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
      
      this.router.navigate(['/task-form']);
    } else {
      console.error('Error en el login');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
