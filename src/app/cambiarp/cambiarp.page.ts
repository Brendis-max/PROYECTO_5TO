import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiarp',
  templateUrl: './cambiarp.page.html',
  styleUrls: ['./cambiarp.page.scss'],
  standalone:false,
})
export class CambiarpPage  {
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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
      this.router.navigate(['/more-page']); // Redirige de vuelta a "Más"
    } else {
      alert('Error al cambiar la contraseña.');
    }
  }

  cancelar() {
    this.router.navigate(['more-page']); // Vuelve a "Más" sin cambios
  }

}
