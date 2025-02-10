import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-nuevop',
  templateUrl: './nuevop.page.html',
  styleUrls: ['./nuevop.page.scss'],
  standalone:false
})
export class NuevopPage implements OnInit {
  pastel = {
    nombre: '',
    tamano: '',
    sabor: '',
    descripcion: '',
    imagen: ''
  };

  constructor(private navController: NavController) { }
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
  ngOnInit() {
  }

}
