import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private compras: any[] = [];  // Productos comprados (tab2)
  private carrito: any[] = [];  // Productos en el carrito (tab3)


  constructor() { }

  agregarCompra(producto: any) {
    this.compras.push(producto);
  }

  agregarCarrito(producto: any) {
    this.carrito.push(producto);
  }

  obtenerCompras() {
    return this.compras;
  }

  obtenerCarrito() {
    return this.carrito;
  }
}
