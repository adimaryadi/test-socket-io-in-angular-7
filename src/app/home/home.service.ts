import { Injectable } from '@angular/core';
import { ConfigService } from './../config/config.service';
import { Socket } from 'ngx-socket-io';
import { config } from 'rxjs';
import { EnkripsiService } from './../config/enkripsi.service';
import 'rxjs/add/operator/map';
import { TreeError } from '@angular/compiler';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  datenow             =     new Date();
  json_date           =     JSON.stringify(this.datenow);
  token               =     this.enkrip.token('adimaryadi',this.json_date);
  constructor(private route: Router,private configService: ConfigService, private socket: Socket,private enkrip: EnkripsiService, private info: MatSnackBar) { 
    this.socket.on('auth_response'+this.token, function(hasil) {
      let terjemaah       =     enkrip.Terjemaah(hasil);
      let json_decode     =     JSON.parse(terjemaah);
      let get_token       =     json_decode[0].token;

      if (json_decode == 'user salah') {
        info.open('INFO','Email dan password salah', {
          duration: 1000,
          verticalPosition: 'top'
        });
      } else {
        let nama      =     json_decode[0].nama;
        let ip_addr   =     json_decode[0].ip_address;
        localStorage.setItem('token', get_token);
        localStorage.setItem('nama', nama);
        localStorage.setItem('ip_address', ip_addr);
        route.navigate(['/halaman']);
      }
    });
  }

  
  Login(data) {
    let config              =     this.configService.JSON_konfig;
    let ip                  =     this.configService.ipaddress;

    let send_transmition    =     {
        login:              data,
        kridensial:         config,
        token:              this.token,
        ip_addr:            ip
    }
    
    let json_send           =     JSON.stringify(send_transmition);
    let enkrip_send         =     this.enkrip.enkripsi(json_send);
    this.socket.emit('auth', enkrip_send);
  } 
}
