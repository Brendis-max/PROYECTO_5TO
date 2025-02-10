import { Component, Input } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: false,
})
export class ExploreContainerComponent {
  compras: any[] = [];
  @Input() name?: string;

  constructor(private productoService: ProductoService) {}
  
  ionViewWillEnter() {
    this.compras = this.productoService.obtenerCompras();
  }

}
