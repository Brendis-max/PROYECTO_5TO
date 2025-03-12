import { Injectable } from '@angular/core';
interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null; // Almacena el objeto completo del usuario

  private usuarioActual: string | null = null; // Almacena el email o nombre del usuario autenticado
  private ultimoAcceso: string | null = null;

  private users: User[] = [];
  constructor() { }

  register(email: string, password: string) {
    if (this.isEmailRegistered(email)) {
      throw new Error('El correo electrónico ya está registrado');
    }

    this.users.push({ email, password });
  }

  // Verificar si un correo está registrado
  isEmailRegistered(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      this.currentUser = user; // Guarda el objeto completo
      this.currentUser.ultimoAcceso = new Date().toLocaleString(); // Actualiza el último acceso
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  estaAutenticado(): boolean {
    return !!this.getCurrentUser().email;
  }

  // Método para actualizar la contraseña
  updatePassword(newPassword: string): boolean {
    if (!this.currentUser) return false;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === this.currentUser.email);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      this.currentUser.password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }
}

