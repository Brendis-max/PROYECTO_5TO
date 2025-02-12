import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
  standalone:false
})
export class DetallePedidoPage implements OnInit {
  pedido: any;

  constructor(private route: ActivatedRoute, private navController: NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['pedido']) {
        this.pedido = JSON.parse(params['pedido']);
        console.log('Pedido recibido:', this.pedido);
      }
    });
  }


  regresar() {
    this.navController.back();
  }

}
