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
    this.nombre = user.nombre;
    this.usuario = user.usuario;
    this.email = user.email;
    this.ultimoAcceso = user.ultimoAcceso;
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  irACambiarContrasena() {
    this.router.navigate(['/cambiarp']); // Redirige a la página de cambio de contraseña
  }


}
