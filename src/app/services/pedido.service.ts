import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
 

  private pedidos: any[] = [];

  agregarPedido(pedido: any) {
    this.pedidos.push(pedido);
  }

  obtenerPedidos() {
    return this.pedidos;
  }
}
