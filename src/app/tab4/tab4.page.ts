import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }
  catalogo() {
    this.navController.navigateForward('/catalogo'); //  la ruta de catalogo
}
}
