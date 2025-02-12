import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

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



  constructor(private route: ActivatedRoute,private navController: NavController,private router: Router) { 
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    if (navigationState) {
      this.producto = navigationState['product'] ?? null;
    }
  
    this.route.queryParams.subscribe(params => {
      if (params['producto']) {
        this.producto = JSON.parse(params['producto']);
        console.log("Producto recibido en NuevopPage:", this.producto);  // Agregar este log
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
    console.log('Pedido realizado:', this.producto);
  }
  ngOnInit() {
  }

}
