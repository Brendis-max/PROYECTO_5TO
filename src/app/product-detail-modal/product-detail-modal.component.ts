import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
})
export class ProductDetailModalComponent {
  @Input() product: any;

  constructor(private modalCtrl: ModalController, private navCtrl: NavController) {}

  // Close the modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

  // Navigate to customization page
  goToCustomize() {
    this.modalCtrl.dismiss().then(() => {
      this.navCtrl.navigateForward('/nuevop', {
        queryParams: {
          product: JSON.stringify(this.product)
        }
      });
    });
  }
}
