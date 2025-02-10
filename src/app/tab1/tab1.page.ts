import { Component, ViewChild} from '@angular/core';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone:false
})
export class Tab1Page {


  constructor(private navController: NavController) {}
 

  nuevop() {
      this.navController.navigateForward('/nuevop'); // Ajusta la ruta si es diferente
  }

}
