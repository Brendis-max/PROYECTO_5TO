import { Component, Input } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

interface Product {
  nombre: string;
  category: string;
  imagen: string;
  precio: string;
  sweetness: number;
  inCart: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  productosCarrito: any[] = [];
  searchText = '';
  selectedCategory = 'todos';

    // Arreglo de productos
    products: Product[] = [
      { nombre: 'Chocoflan', category: 'pan', imagen: 'assets/Chocoflan.jpg', precio: '$300.00', sweetness: 8, inCart: false },
      { nombre: 'Cheesecake', category: 'pasteles', imagen: 'assets/Cheesecake.jpg', precio: '$270.00', sweetness: 7, inCart: false },
      { nombre: 'Cake Rosa', category: 'pan', imagen: 'assets/coke rosa.jpg', precio: '$220.00', sweetness: 6, inCart: false },
      { nombre: 'Concha', category: 'pan', imagen: 'assets/Concha.jpg', precio: '$50.00', sweetness: 7, inCart: false },
      { nombre: 'Cupcakes', category: 'pasteles', imagen: 'assets/Cup cakes.jpg', precio: '$180.00', sweetness: 8, inCart: false },
      { nombre: 'Pastel Princesas', category: 'pasteles', imagen: 'assets/PRINCESA.jpeg', precio: '$2,000.00', sweetness: 7, inCart: false },
      { nombre: 'Gelatina de Mosaico', category: 'otros', imagen: 'assets/Gelatina de mosaico.jpg', precio: '$120.00', sweetness: 6, inCart: false },
      {nombre: 'Pastel Mexicano', category: 'pasteles', imagen: 'assets/imagen1.JPG', precio: '$250.00', sweetness: 6, inCart: false },
      { nombre: 'Nueces', category: 'pan', imagen: 'assets/nueces.jpg', precio: '$150.00', sweetness: 3, inCart: false },
      { nombre: 'Pan de Muerto', category: 'pan', imagen: 'assets/rosca2.jpg', precio: '$150.00', sweetness: 6, inCart: false },
      { nombre: 'Pastel de Chocolate con Fresas', category: 'pasteles', imagen: 'assets/PASTEL DE CHOCOLATE CON FRESAS.jpg', precio: '$280.00', sweetness: 8, inCart: false },
      { nombre: 'Pastel de Tres Leches', category: 'pasteles', imagen: 'assets/Pastel De Chocolate De Tres Leches.jpg', precio: '$250.00', sweetness: 9, inCart: false },
      { nombre: 'Pastel de Tiramisú', category: 'pasteles', imagen: 'assets/Pastel de Tiramisu.jpg', precio: '$300.00', sweetness: 7, inCart: false },
      { nombre: 'Pastel Mega Chocolate', category: 'pasteles', imagen: 'assets/PASTEL MEGA CHOCOLATE.jpg', precio: '$350.00', sweetness: 10, inCart: false },
      { nombre: 'Cupcakes Te Amo', category: 'pasteles', imagen: 'assets/te amo.jpg', precio: '$220.00', sweetness: 8, inCart: false },
      { nombre: 'Pastel de Vainilla Tres Leches', category: 'pasteles', imagen: 'assets/Postel De Vainilla De tres leches.jpg', precio: '$240.00', sweetness: 8, inCart: false }
    
    ];
  
    filteredProducts: Product[] = [...this.products];
  
    constructor(private navController: NavController,private productoService: ProductoService,) {}
  
    ngOnInit() {
      console.log("CatalogoPage cargado correctamente");
    }
    // comprarAhora(producto: any) {
    
    //   this.productoService.agregarCompra(producto);
    //   console.log("Compras actuales:", this.productoService.obtenerCompras());
    //   this.navController.navigateForward('/tabs/tab2');
  
    // }
    // Filtrar productos en base a la búsqueda
    // filterProducts() {
    //   if (this.searchText.trim() === '') {
    //     this.filteredProducts = [...this.products];
    //   } else {
    //     this.filteredProducts = this.products.filter(product =>
    //       product.title.toLowerCase().includes(this.searchText.toLowerCase())
    //     );
    //   }
    // }

    catalogo() {
      this.navController.navigateForward('/catalogo'); //  la ruta de catalogo
    }
    filterProducts() {
      this.filteredProducts = this.products.filter(product =>
        product.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    filterByCategory() {
      if (this.selectedCategory === 'todos') {
        this.filteredProducts = [...this.products];
      } else {
        this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
      }
    }
  
    comprarAhora(product: Product) {
      product.inCart = true;
    }
    verDetalles(product: Product) {
      const navigationExtras: NavigationExtras = {
        state: {
          product: product
        }
      };
      this.navController.navigateForward(['/nuevop'], navigationExtras);
    }
    // removeFromCart(product: Product) {
    //   product.inCart = false;
    // }
    
    anadirAlCarrito(product: Product) {
      this.productoService.agregarCarrito(product); // Agregar al carrito
      console.log("Producto añadido al carrito:", product);
      this.productosCarrito = this.productoService.obtenerCarrito(); // Actualizar el carrito en la vista
    }
  
    eliminarDelCarrito(index: number) {
      this.productoService.eliminarDelCarrito(index); // Eliminar del carrito por índice
      this.productosCarrito = this.productoService.obtenerCarrito(); // Actualizar el carrito en la vista
    }
    notificaciones() {
      this.navController.navigateForward('/notificaciones');
    }
}
