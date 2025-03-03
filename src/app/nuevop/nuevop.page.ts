import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-nuevop',
  templateUrl: './nuevop.page.html',
  styleUrls: ['./nuevop.page.scss'],
  standalone:false
})

  export class NuevopPage implements OnInit {
    producto: any;
    pedido: any = {
      tamano: '',
      forma: '',
      sabor: '',
      relleno: '',
      decoracion: '',
      mensaje: '',
      productos: [] // Lista de productos en el pedido
    };
  
    constructor(
      private route: ActivatedRoute,
      private navController: NavController,
      private router: Router,
      private pedidoService: PedidoService,
      private alertCtrl: AlertController
    ) {
      const navigationState = this.router.getCurrentNavigation()?.extras.state;
      if (navigationState) {
        this.producto = navigationState['product'] ?? null;
        if (this.producto && typeof this.producto.precio === 'string') {
          this.producto.precio = parseFloat(this.producto.precio.replace(/[^0-9.]/g, '')) || 0;
        }
        this.pedido.productos.push(this.producto);
      }
    }
  
    ngOnInit() {}
  
    hacerPedido() {
      const nuevoPedido = {
        id: Math.floor(Math.random() * 10000),
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Pendiente',
        detalles: this.pedido,
        productos: this.pedido.productos
      };
      this.pedidoService.agregarPedido(nuevoPedido);
      this.navController.navigateBack('/tabs/tab3');
    }
  
    async procederAlPago() {
      const alert = await this.alertCtrl.create({
        header: 'Confirmar Pago',
        message: `Total: $${this.calcularTotal()}. ¿Deseas proceder con el pago?`,
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Pagar',
            handler: () => {
              this.realizarPago();
            }
          }
        ]
      });
      await alert.present();
    }
  
    calcularTotal() {
      return this.pedido.productos.reduce((total: number, p: any) => total + (p.precio || 0), 0);
    }
  
    realizarPago() {
      const pedidoPagado = {
        ...this.pedido,
        id: Math.floor(Math.random() * 10000),
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Pagado',
        total: this.calcularTotal()
      };
      this.pedidoService.agregarPedido(pedidoPagado);
      this.generarPDF(pedidoPagado);
      this.navController.navigateBack('/tabs/tab3');
    }
  
    generarPDF(pedido: any) {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Pasteles Mimi - Recibo', 20, 20);
      doc.setFontSize(12);
     
      doc.text('Detalles del pedido:', 20, 60);
      doc.text(`Tamaño: ${pedido.tamano}`, 20, 70);
      doc.text(`Forma: ${pedido.forma}`, 20, 80);
      doc.text(`Sabor: ${pedido.sabor}`, 20, 90);
      doc.text(`Relleno: ${pedido.relleno}`, 20, 100);
      doc.text(`Decoración: ${pedido.decoracion}`, 20, 110);
      doc.text(`Mensaje: ${pedido.mensaje}`, 20, 120);
      doc.text('Productos:', 20, 130);
      pedido.productos.forEach((p: any, i: number) => {
        doc.text(`${p.nombre} - $${p.precio}`, 30, 140 + i * 10);
      });
      doc.text(`Total: $${pedido.total}`, 20, 140 + pedido.productos.length * 10);
      doc.save(`recibo-pedido-${pedido.id}.pdf`);
    }




    
    recomendaciones = [
      { nombre: 'Pastel de Chocolate', precio: 20, imagen: 'assets/chocofresa.jpeg' },
      { nombre: 'Cupcakes de Fresa', precio: 15, imagen: 'assets/coke rosa.jpg' },
      { nombre: 'Gelatina de mosaico', precio: 25, imagen: 'assets/Gelatina de mosaico.jpg' }
    ];
  
    agregarRecomendado(recomendado: any) {
      this.pedido.productos.push(recomendado);
      console.log('Producto añadido:', recomendado);
    }
  }
    
 
  
  
  
  
  
    
   
    
  
     
  