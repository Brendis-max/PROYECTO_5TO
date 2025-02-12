import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidos: any[] = [];

  constructor() { }

  obtenerPedidos(): any[] {
    return this.pedidos;
  }

  // Agregar un nuevo pedido
  agregarPedido(pedido: any) {
    this.pedidos.push(pedido);
  }

  // Obtener un pedido por su ID
  obtenerPedidoPorId(id: number): any {
    return this.pedidos.find(pedido => pedido.id === id);
  }
}
