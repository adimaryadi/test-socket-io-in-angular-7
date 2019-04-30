import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './../home.service';
import { EnkripsiService } from './../../config/enkripsi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeservice: HomeService, private enkrip: EnkripsiService, private route: Router) { 

  }

  login   =   new FormGroup({
    email:       new FormControl('',Validators.email),
    password:    new FormControl('',Validators.required)
  });

  ngOnInit() {
    let cek_token_local   =   localStorage.getItem('token');

    this.cekToken(cek_token_local);
  }

  cekToken(token) {
    
    if (token == null) {
      
    } else {
      this.route.navigate(['/halaman']);
    }    
  }

  Kirim() {
    let email             =   this.login.value.email;
    let password          =   this.login.value.password;
    let password_enkrip   =   this.enkrip.enkripsi(password);
    let form_login        =   {
      email:        email,
      password:     password_enkrip
    }   
    this.homeservice.Login(form_login);
  }
}
