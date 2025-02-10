import { Component, Input } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  compras: any[] = [];
  @Input() name?: string;

  constructor(private navController: NavController,private productoService: ProductoService) {}
  catalogo() {
    this.navController.navigateForward('/catalogo'); //  la ruta de catalogo
}
  ionViewWillEnter() {
    this.compras = this.productoService.obtenerCompras();
  }


}
