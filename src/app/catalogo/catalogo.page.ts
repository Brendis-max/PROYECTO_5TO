import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';

interface Product {
  title: string;
  image: string;
  subtitle: string;
  price: string;
  inCart: boolean;
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
})
export class CatalogoPage implements OnInit {
  searchText: string = '';

  // Arreglo de productos
  products: Product[] = [
    { title: 'Cheesecake', image: 'assets/Cheesecake.jpg', subtitle: 'Con frutos rojos', price: '$270.00', inCart: false },
    { title: 'Chocoflan', image: 'assets/Chocoflan.jpg', subtitle: 'Flan y pastel en uno', price: '$300.00', inCart: false },
    { title: 'Cake Rosa', image: 'assets/coke rosa.jpg', subtitle: 'Pastel con decoración rosa', price: '$220.00', inCart: false },
    { title: 'Concha', image: 'assets/Concha.jpg', subtitle: 'Deliciosas conchas mexicanas', price: '$50.00', inCart: false },
    { title: 'Cupcakes', image: 'assets/Cup cakes.jpg', subtitle: 'Dulces y decorados', price: '$180.00', inCart: false },
    { title: 'Princesas', image: 'assets/PRINCESA.jpeg', subtitle: 'Decoración pequeña y colorida', price: '$2,000.00', inCart: false },
    { title: 'Gelatina de Mosaico', image: 'assets/Gelatina de mosaico.jpg', subtitle: 'Gelatina con varios sabores', price: '$120.00', inCart: false },
    { title: 'Pastel Mexicano', image: 'assets/imagen1.JPG', subtitle: 'Pastel de temporada', price: '$250.00', inCart: false },
    { title: 'Nueces', image: 'assets/nueces.jpg', subtitle: 'Nueces frescas', price: '$150.00', inCart: false },
    { title: 'Pan de Muerto', image: 'assets/rosca2.jpg', subtitle: 'Solo por temporada', price: '$150.00', inCart: false },
    { title: 'Pastel de Chocolate con Fresas', image: 'assets/PASTEL DE CHOCOLATE CON FRESAS.jpg', subtitle: 'Chocolate y fresas frescas', price: '$280.00', inCart: false },
    { title: 'Pastel de Tres Leches', image: 'assets/Pastel De Chocolate De Tres Leches.jpg', subtitle: 'Súper esponjoso', price: '$250.00', inCart: false },
    { title: 'Pastel de Tiramisu', image: 'assets/Pastel de Tiramisu.jpg', subtitle: 'Clásico italiano', price: '$300.00', inCart: false },
    { title: 'Pastel Mega Chocolate', image: 'assets/PASTEL MEGA CHOCOLATE.jpg', subtitle: 'Para los amantes del chocolate', price: '$350.00', inCart: false },
    { title: 'Cupcakes', image: 'assets/te amo.jpg', subtitle: 'Un postre para compartir', price: '$220.00', inCart: false },
    { title: 'Pastel de Vainilla Tres Leches', image: 'assets/Postel De Vainilla De tres leches.jpg', subtitle: 'Delicioso pastel de vainilla', price: '$240.00', inCart: false }
  ];

  filteredProducts: Product[] = [...this.products];

  constructor(private navController: NavController,private productoService: ProductoService) {}

  ngOnInit() {
    console.log("CatalogoPage cargado correctamente");
  }
  comprarAhora(producto: any) {
    this.productoService.agregarCompra(producto);
    console.log("Compras actuales:", this.productoService.obtenerCompras());
    this.navController.navigateForward('/tabs/tab2');

  }
  // Filtrar productos en base a la búsqueda
  filterProducts() {
    if (this.searchText.trim() === '') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  // Agregar producto al carrito
  addToCart(product: Product) {
    let cartItems: Product[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Verificar si el producto ya está en el carrito
    const productIndex = cartItems.findIndex(item => item.title === product.title);
    if (productIndex === -1) {
      cartItems.push({ ...product, inCart: true }); // Usar un nuevo objeto para evitar referencias
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      product.inCart = true;
    } else {
      console.log('Este producto ya está en el carrito');
    }
  }

  // Eliminar producto del carrito
  removeFromCart(product: Product): void {
    let cartItems: Product[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Buscar el índice del producto en el carrito
    const productIndex = cartItems.findIndex(item => item.title === product.title);
    if (productIndex !== -1) {
      // Eliminar el producto del carrito
      cartItems.splice(productIndex, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      product.inCart = false;
    } else {
      console.log('Este producto no está en el carrito');
    }
  }
}