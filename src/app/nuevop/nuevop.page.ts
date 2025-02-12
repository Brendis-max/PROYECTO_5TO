import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-nuevop',
  templateUrl: './nuevop.page.html',
  styleUrls: ['./nuevop.page.scss'],
  standalone:false
})
export class NuevopPage implements OnInit {
  producto: any;

  pastel = {
    nombre: '',
    tamano: '',
    sabor: '',
    descripcion: '',
    imagen: ''
  };

  pedido:any = {
    tamano: '',
    forma: '',
    sabor: '',
    relleno: '',
    decoracion: '',
    mensaje: '',
    entrega: false
  };

  constructor(private route: ActivatedRoute,private navController: NavController,private router: Router, private pedidoService: PedidoService) { 

    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    if (navigationState) {
      this.producto = navigationState['product'] ?? null;
    }

    this.route.queryParams.subscribe(params => {
      if (params['producto']) {
        this.producto = JSON.parse(params['producto']);
        console.log("Producto recibido en NuevopPage:", this.producto);
      }
    });
  }

  crearPastel() {
    console.log('Pastel creado:', this.pastel);
  }
  nuevop() {
    this.navController.navigateForward('/nuevop'); // Navega a la página "nuevop"
  }

  cargarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pastel.imagen = e.target.result;
      };
      reader.readAsDataURL(archivo);
    }
   
  }

  anadirAlCarrito(producto: any) {
    console.log('Producto añadido al carrito:', producto);
  }
  hacerPedido() {
    // Crear el objeto del nuevo pedido
    const nuevoPedido = {
      id: Math.floor(Math.random() * 10000),
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      detalles: this.pedido,
      producto: this.producto // Incluimos el producto seleccionado
    };

    // Guardar el pedido en el servicio
    this.pedidoService.agregarPedido(nuevoPedido);

    // Redirigir a Tab 3 donde se mostrarán los pedidos
    this.navController.navigateRoot('/tabs/tab3');
  }

  ngOnInit() { }
}
 

