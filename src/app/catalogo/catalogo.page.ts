import { Component, Input,OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
})
export class CatalogoPage implements OnInit {
  productosCarrito: any[] = [];
  compras: any[] = [];
  @Input() name?: string;

  constructor(private navController: NavController,private productoService: ProductoService,private route: ActivatedRoute) {

    this.productosCarrito = this.productoService.obtenerCarrito(); // Obtener el carrito del servicio
 
  }
  eliminarDelCarrito(index: number) {
    // Llamamos al método del servicio para eliminar el producto
    this.productoService.eliminarDelCarrito(index);
    // Actualizamos la lista de productos en el carrito después de eliminar
    this.productosCarrito = this.productoService.obtenerCarrito();
  }


  ngOnInit() {
    // Recibir los productos del carrito desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['productos']) {
        this.productosCarrito = JSON.parse(params['productos']);  // Convertir el string JSON en un array
        console.log("Productos en el carrito:", this.productosCarrito);
      }
    });
  }



  catalogo() {
    this.navController.navigateForward('/catalogo'); //  la ruta de catalogo
}
  notificaciones() {
  this.navController.navigateForward('/notificaciones'); //  la ruta de catalogo
}
  ionViewWillEnter() {
    this.compras = this.productoService.obtenerCompras();
  }


}