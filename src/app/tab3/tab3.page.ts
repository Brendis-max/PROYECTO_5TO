import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  carrito: any[] = [];

  constructor(private productoService: ProductoService) {}
  ionViewWillEnter() {
    this.carrito = this.productoService.obtenerCarrito();
  }
}
