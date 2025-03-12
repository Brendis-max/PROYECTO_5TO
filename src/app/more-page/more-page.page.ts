import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-page',
  templateUrl: './more-page.page.html',
  styleUrls: ['./more-page.page.scss'],
  standalone:false
})
export class MorePagePage implements OnInit {
  nombre: string | null = null;
  usuario: string | null = null;
  email: string | null = null;
  ultimoAcceso: string | null = null;
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const user = this.authService.getCurrentUser();
    this.nombre = user.nombre ?? 'No disponible';
    this.usuario = user.usuario ?? 'No disponible';
    this.email = user.email ?? 'No disponible';
    this.ultimoAcceso = user.ultimoAcceso ?? 'No registrado';
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cambiarContrasena() {
    if (!this.newPassword || !this.confirmNewPassword) {
      alert('Por favor, ingrese la nueva contraseña y confírmela.');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const exito = this.authService.updatePassword(this.newPassword);
    if (exito) {
      alert('Contraseña cambiada exitosamente.');
      this.newPassword = '';
      this.confirmNewPassword = '';
    } else {
      alert('Error al cambiar la contraseña.');
    }
  }


}
