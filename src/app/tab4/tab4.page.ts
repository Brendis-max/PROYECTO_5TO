import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {
  historialPedidos: any[] = [];

  constructor(private navController: NavController, private pedidoService: PedidoService) {}

  ngOnInit() {
    this.cargarHistorial();
  }

  ionViewWillEnter() {
    this.cargarHistorial();
  }

  cargarHistorial() {
    // Filtrar pedidos completados (Pagado o Entregado)
    this.historialPedidos = this.pedidoService.obtenerPedidos().filter(
      pedido => pedido.estado === 'Pagado' || pedido.estado === 'Entregado'
    );
  }

  getProductosNombres(pedido: any): string {
    return pedido.productos?.map((p: any) => p.nombre).join(', ') || 'Sin productos';
  }

  verDetallePedido(pedido: any) {
    this.navController.navigateForward('/detalle-pedido', {
      queryParams: { pedido: JSON.stringify(pedido) }
    });
  }

  catalogo() {
    this.navController.navigateForward('/tabs/tab2');
  }
  

  verNotificaciones() {
    this.navController.navigateForward('/notificaciones');
  }
  more() {
    this.navController.navigateForward('/more-page');
  }
}
