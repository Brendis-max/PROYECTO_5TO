import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage {
  passwordVisible = false;

  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (!this.email || !this.password) {
      alert('Por favor, ingrese su correo y contraseña.');
      return;
    }

    // Obtener los usuarios registrados
    const loginExitoso = this.authService.login(this.email, this.password);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);

    if (user) {
      alert('Inicio de sesión exitoso.');
      this.router.navigate(['/tabs/tab1']); // Redirigir a la página principal
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  }
 
  goToRegister() {
    this.router.navigate(['/register']);
  }
}