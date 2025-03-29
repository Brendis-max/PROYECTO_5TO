import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  nombre: string = '';
  usuario: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private authService: AuthService // Inyecta el servicio
  ) {}

  register() {
    // Validaciones
    if (!this.isFormValid()) {
      return;
    }

    try {
      // Crear nuevo usuario
      const newUser = {
        nombre: this.nombre.trim(),
        usuario: this.usuario.trim(),
        email: this.email.trim().toLowerCase(),
        password: this.password
      };

      // Verificar si el email ya existe
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.some((user: any) => user.email === newUser.email)) {
        alert('Este correo ya está registrado.');
        return;
      }

      // Agregar nuevo usuario
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
    } catch (error) {
      alert('Error durante el registro: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  }

  private isFormValid(): boolean {
    // Validar campos vacíos
    if (!this.nombre.trim() || !this.usuario.trim() || !this.email.trim() || 
        !this.password || !this.confirmPassword) {
      alert('Por favor, complete todos los campos.');
      return false;
    }

    // Validar longitud mínima del nombre y usuario
    if (this.nombre.trim().length < 2) {
      alert('El nombre debe tener al menos 2 caracteres.');
      return false;
    }

    if (this.usuario.trim().length < 3) {
      alert('El usuario debe tener al menos 3 caracteres.');
      return false;
    }

    // Validar formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return false;
    }

    // Validar requisitos de la contraseña
    if (!this.isPasswordValid()) {
      alert('La contraseña debe tener al menos 6 caracteres, incluyendo una mayúscula, una minúscula y un número.');
      return false;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return false;
    }

    return true;
  }

  private isPasswordValid(): boolean {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(this.password);  
  }
  

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
