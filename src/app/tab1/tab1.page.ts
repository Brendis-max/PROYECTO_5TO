import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page {
  promociones = [
    {
      nombre: 'Pan de Muerto',
      descripcion: 'Solo por hoy a mitad de precio',
      precio: '$150',
      imagen: 'assets/rosca2.jpg'
    },
    {
      nombre: 'Pastel de Chocolate',
      descripcion: 'Descuento especial en porciones individuales',
      precio: '$90',
      imagen: 'assets/lo mas delicioso.jpg'
    }
  ];

  productosDestacados = [
    { nombre: 'Pastel de Fresa', precio: '$250', imagen: 'assets/chocofresa.jpeg' },
    { nombre: 'Pastel de Chocolate', precio: '$300', imagen: 'assets/Pastel De Chocolate De Tres Leches.jpg' },
    { nombre: 'Rosca de Reyes', precio: '$180', imagen: 'assets/rosca.jpeg' }
  ];
  carrito: any[] = [];

  constructor(
    private navController: NavController,
    private productoService: ProductoService,
    private router: Router
  ) {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
  if (navigationState) {
    this.promociones = navigationState['promociones'] ?? null;
    this.productosDestacados = navigationState['productosDestacados'] ?? null;
 
  }


    console.log("Servicio cargado. Compras:", this.productoService.obtenerCompras());
    console.log("Servicio cargado. Carrito:", this.productoService.obtenerCarrito());
  }
  verDetalles(producto: any) {
    this.navController.navigateForward(['/nuevop'], {
      state: { product: producto }
    });
  }

  catalogo() {
    const productosCarrito = this.productoService.obtenerCarrito();
    this.router.navigate(['/catalogo'], {
      queryParams: { productos: JSON.stringify(productosCarrito) }
    });
  }
  notificaciones(){

    this.router.navigate(['/notificaciones'])
  }
  nuevop() {
    this.navController.navigateForward('/nuevop');
  }

  comprarAhora(producto: any) {
    this.productoService.agregarCompra(producto);
    console.log("Compras actuales:", this.productoService.obtenerCompras());
    this.navController.navigateForward('/tabs/tab2');
  }

  anadirAlCarrito(producto: any) {
    // Agregar el producto al carrito
    this.productoService.agregarCarrito(producto);
    console.log("Producto añadido al carrito:", producto);
    console.log("Carrito actual:", this.productoService.obtenerCarrito());
  
    // Redirigir al catálogo y pasar los productos en el carrito
    this.router.navigate(['/catalogo'], {
      queryParams: {
        productos: JSON.stringify(this.productoService.obtenerCarrito()) // Envía los productos en el carrito como JSON
      }
    });
  }
}
