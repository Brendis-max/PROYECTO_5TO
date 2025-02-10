import { Component, Input } from '@angular/core';
import { ProductoService } from '../services/producto.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  compras: any[] = [];
  @Input() name?: string;

  constructor(private productoService: ProductoService) {}
  
  ionViewWillEnter() {
    this.compras = this.productoService.obtenerCompras();
  }


}
