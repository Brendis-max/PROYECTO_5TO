import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
  standalone:false
})
export class NotificacionesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  notifications = [
    {
      title: '¡Pastel listo!',
      message: 'Tu pedido de pastel de fresa está listo para recoger.',
      timestamp: new Date(),
      icon: 'assets/icon/icon2cake.png', // Icono temático
      read: false
    },
    {
      title: 'Oferta especial',
      message: '¡20% de descuento en cupcakes hoy!',
      timestamp: new Date(Date.now() - 3600000), // Hace 1 hora
      icon: 'assets/icon/icon3cake.png',
      read: true
    }
  ];

  markAsRead(notification: any) {
    notification.read = true;
  }

  dismissNotification(notification: any, event: Event) {
    event.stopPropagation(); // Evita que el clic marque como leído
    this.notifications = this.notifications.filter(n => n !== notification);
  }
}
