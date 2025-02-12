import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Verificar si el usuario ya está registrado
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some((user: any) => user.email === this.email)) {
      alert('Este correo ya está registrado.');
      return;
    }

    // Guardar usuario en localStorage
    existingUsers.push({ email: this.email, password: this.password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    this.router.navigate(['/login']); // Redirigir a Login
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}