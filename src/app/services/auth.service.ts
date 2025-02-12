import { Injectable } from '@angular/core';
interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  // Método de inicio de sesión
  login(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email && user.password === password);
    return !!user;
  }
}
