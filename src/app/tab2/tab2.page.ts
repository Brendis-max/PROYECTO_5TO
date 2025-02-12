import { Component, Input } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { NavController } from '@ionic/angular';


interface Product {
  title: string;
  category: string;
  image: string;
  price: string;
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
  searchText = '';
  selectedCategory = 'todos';

    // Arreglo de productos
    products: Product[] = [
      { title: 'Cheesecake', category: 'pasteles', image: 'assets/Cheesecake.jpg', price: '$270.00', sweetness: 7, inCart: false },
      { title: 'Chocoflan', category: 'pan', image: 'assets/Chocoflan.jpg', price: '$300.00', sweetness: 8, inCart: false },
      { title: 'Cake Rosa', category: 'pan', image: 'assets/coke rosa.jpg', price: '$220.00', sweetness: 6, inCart: false },
      { title: 'Concha', category: 'pan', image: 'assets/Concha.jpg', price: '$50.00', sweetness: 7, inCart: false },
      { title: 'Cupcakes', category: 'pasteles', image: 'assets/Cup cakes.jpg', price: '$180.00', sweetness: 8, inCart: false },
      { title: 'Pastel Princesas', category: 'pasteles', image: 'assets/PRINCESA.jpeg', price: '$2,000.00', sweetness: 7, inCart: false },
      { title: 'Gelatina de Mosaico', category: 'otros', image: 'assets/Gelatina de mosaico.jpg', price: '$120.00', sweetness: 6, inCart: false },
      { title: 'Pastel Mexicano', category: 'pasteles', image: 'assets/imagen1.JPG', price: '$250.00', sweetness: 6, inCart: false },
      { title: 'Nueces', category: 'pan', image: 'assets/nueces.jpg', price: '$150.00', sweetness: 3, inCart: false },
      { title: 'Pan de Muerto', category: 'pan', image: 'assets/rosca2.jpg', price: '$150.00', sweetness: 6, inCart: false },
      { title: 'Pastel de Chocolate con Fresas', category: 'pasteles', image: 'assets/PASTEL DE CHOCOLATE CON FRESAS.jpg', price: '$280.00', sweetness: 8, inCart: false },
      { title: 'Pastel de Tres Leches', category: 'pasteles', image: 'assets/Pastel De Chocolate De Tres Leches.jpg', price: '$250.00', sweetness: 9, inCart: false },
      { title: 'Pastel de Tiramisú', category: 'pasteles', image: 'assets/Pastel de Tiramisu.jpg', price: '$300.00', sweetness: 7, inCart: false },
      { title: 'Pastel Mega Chocolate', category: 'pasteles', image: 'assets/PASTEL MEGA CHOCOLATE.jpg', price: '$350.00', sweetness: 10, inCart: false },
      { title: 'Cupcakes Te Amo', category: 'pasteles', image: 'assets/te amo.jpg', price: '$220.00', sweetness: 8, inCart: false },
      { title: 'Pastel de Vainilla Tres Leches', category: 'pasteles', image: 'assets/Postel De Vainilla De tres leches.jpg', price: '$240.00', sweetness: 8, inCart: false }
    
    ];
  
    filteredProducts: Product[] = [...this.products];
  
    constructor(private navController: NavController,private productoService: ProductoService) {}
  
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
        product.title.toLowerCase().includes(this.searchText.toLowerCase())
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
  
    // removeFromCart(product: Product) {
    //   product.inCart = false;
    // }

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
      product.inCart = false;
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
