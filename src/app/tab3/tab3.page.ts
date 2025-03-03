import { Component ,OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { PedidoService } from '../services/pedido.service'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit{
  pedidos: any[] = [];

  constructor(private navController: NavController, private pedidoService: PedidoService) {}

  ngOnInit() {
    this.obtenerPedidos();
  }

  ionViewWillEnter() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.pedidos = this.pedidoService.obtenerPedidos();
  }

  // Nueva función para obtener los nombres de productos
  getProductosNombres(pedido: any): string {
    return pedido.productos?.map((p: any) => p.nombre).join(', ') || 'Sin productos';
  }

  verDetallePedido(pedido: any) {
    this.navController.navigateForward('/detalle-pedido', {
      queryParams: { pedido: JSON.stringify(pedido) }
    });
  }

  catalogo() {
    this.navController.navigateForward('/catalogo');
  }

  verNotificaciones() {
    this.navController.navigateForward('/notifications');
  }
}