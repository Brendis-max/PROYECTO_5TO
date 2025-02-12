import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 
  private compras: any[] = [];  // Productos comprados (tab2)
  private carrito: any[] = [];  // Productos en el carrito (tab3)


  constructor() {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

   }
  //  obtenerCarrito() {
  //   return this.carrito;
  // }

  // Método para agregar un producto al carrito
  agregarCarrito(producto: any) {
    this.carrito.push(producto);
    this.guardarCarrito();
  }

  // Método para eliminar un producto del carrito
  eliminarDelCarrito(index: number) {
    this.carrito.splice(index,1); // Elimina el producto por índice
    this.guardarCarrito();
  }

  // Método para guardar el carrito en el localStorage
  private guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
  agregarCompra(producto: any) {
    this.compras.push(producto);
  }

  // agregarCarrito(producto: any) {
  //   this.carrito.push(producto);
  // }

  obtenerCompras() {
    return this.compras;
  }

  obtenerCarrito() {
    return this.carrito;
  }
}
