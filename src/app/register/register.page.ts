import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage implements OnInit {
  
  email: string = "";
  password: string = "";
  password_confirm: string = "";


  constructor(private router: Router,private navController: NavController,) { }

  ngOnInit() {
  }

 
  
  register(form: NgForm) {
    console.log('form:', form.value);
    console.log(form.valid);
    console.log(form.invalid);



    if (form.invalid) {

      this.navController.navigateBack('/login')

    }

  }

}
