import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-pastel',
  standalone: false,
  templateUrl: './detalle-pastel.page.html',
  styleUrls: ['./detalle-pastel.page.scss'],
})
export class DetallePastelPage implements OnInit {

 
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    
  }

 
}
