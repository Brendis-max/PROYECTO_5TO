import { Component, ViewChild} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone:false
})
export class Tab1Page {


  constructor(private navController: NavController,private productoService: ProductoService) {
    console.log("Servicio cargado. Compras:", this.productoService.obtenerCompras());
    console.log("Servicio cargado. Carrito:", this.productoService.obtenerCarrito());
  
  }
 

  nuevop() {
      this.navController.navigateForward('/nuevop'); // Ajusta la ruta si es diferente
  }
  comprarAhora(producto: any) {
    this.productoService.agregarCompra(producto);
    console.log("Compras actuales:", this.productoService.obtenerCompras());
    this.navController.navigateForward('/tabs/tab2');

  }

  anadirAlCarrito(producto: any) {
    this.productoService.agregarCarrito(producto); // Asegúrate de que este método existe en ProductoService
    console.log("Producto añadido al carrito:", producto);
    console.log("Carrito actual:", this.productoService.obtenerCarrito());
    this.navController.navigateForward('/tabs/tab3');
 
}


  
}
