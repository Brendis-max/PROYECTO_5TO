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
  carrito: any[] = [];
  pedido: any = null;

  pedidos: any[] = [];

  productosCarrito: any[] = [];


  constructor(private navController: NavController,private productoService: ProductoService, private pedidoService: PedidoService) {
    // this.productosCarrito = this.productoService.obtenerCarrito(); // Obtener productos del carrito
 
  }

  ngOnInit() {
    this.obtenerPedidos();
  }

  ionViewWillEnter() {
    this.obtenerPedidos();
  }
    // const pedidosGuardados = localStorage.getItem('pedidos');
    // this.pedidos = pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
 
 
    // const pedidoGuardado = localStorage.getItem('pedidos');

    // if (pedidoGuardado) {
    //   this.pedido = JSON.parse(pedidoGuardado);
    // }
  
  // agregarPedido(nuevoPedido: any) {
  //   // Recuperar pedidos existentes antes de agregar el nuevo
  //   const pedidosGuardados = localStorage.getItem('pedidos');
  //   let listaPedidos = pedidosGuardados ? JSON.parse(pedidosGuardados) : [];

  //   listaPedidos.push(nuevoPedido); // Agregar el nuevo pedido a la lista
  //   localStorage.setItem('pedidos', JSON.stringify(listaPedidos)); // Guardar en localStorage

  //   this.pedidos = listaPedidos; // Actualizar la variable en la vista
  // }

  confirmarCompra() {
    if (this.productosCarrito.length === 0) {
      console.log('El carrito está vacío');
      return;
    }

    const nuevoPedido = {
      id: Math.floor(Math.random() * 10000), // ID aleatorio
      fecha: new Date().toISOString().split('T')[0], // Fecha actual
      estado: 'Pendiente',
      productos: this.productosCarrito, // Productos comprados
    };

    // Guardar el pedido en el servicio
    this.pedidoService.agregarPedido(nuevoPedido);

   

    // Navegar a la pantalla de pedidos
    this.navController.navigateForward('/tab3');
  }

  
  obtenerPedidos() {
    this.pedidos = this.pedidoService.obtenerPedidos();
  }

  verDetallePedido(pedido: any) {
    this.navController.navigateForward('/detalle-pedido', {
      queryParams: { pedido: JSON.stringify(pedido) },
    });
  }
  catalogo() {
    this.navController.navigateForward('/catalogo'); //  la ruta de catalogo
}
}
