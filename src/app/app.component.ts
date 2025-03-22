import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor() {
    this.initializeApp();
  }

  public appPages = [
    { title: 'Inicio con Google', url: '/google-login', icon: 'logo-google' },
    { title: 'Inicio con Red Social', url: '/social-login', icon: 'share-social' },
    { title: 'Escanear QR/Barras', url: '/qr-scanner', icon: 'scan' },
    { title: 'Cambiar Foto Perfil', url: '/profile-pic', icon: 'camera' },
    { title: 'Pago con PayPal', url: '/paypal', icon: 'cash' },
  ];

  async initializeApp() {
    // Mostrar el splash screen manualmente
    await SplashScreen.show({
      showDuration: 3000, // Duración en milisegundos
      autoHide: true, // Ocultar automáticamente después del tiempo
    });
  }
}