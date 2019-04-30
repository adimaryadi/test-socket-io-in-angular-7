import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnkripsiService } from './enkripsi.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  datenow             =     new Date();
  json_date           =     JSON.stringify(this.datenow);  
  token_local         =     localStorage.getItem('token');
  token_links         =     this.enkrip.token(this.token_local,this.json_date);

  constructor(private socket: Socket, private http: HttpClient, private route: Router, private enkrip: EnkripsiService) { 
    this.Ipaddr();
    socket.on('hasil_token'+this.token_links, function(hasil) {
      let terjemaah      =        enkrip.Terjemaah(hasil);
      let json_data      =        JSON.parse(terjemaah);
      if (json_data == 'token_ada') {
          return true;
      } else {
        localStorage.clear();
        return route.navigate(['/']);        
      }
    });
  }
  ipaddress:any;

  TokenCek(token) {
    let data  =   {
      token_cek:  token,
      token_link: this.token_links
    }

    let data_json   =   JSON.stringify(data);
    let data_enkrip =   this.enkrip.enkripsi(data_json);
    return this.socket.emit('cek_token', data_enkrip);
  }
  
  Ipaddr() {
    let ip      = this.http.get<{ip:string}>('https://jsonip.com')
                  .subscribe(data => {
                   this.ipaddress  =  data.ip;
    });
  }

  konfig        =    {
    server:     'localhost',
    user:       'root',
    password:   '',
    database:   'chatme'
  };

  JSON_konfig   =     JSON.stringify(this.konfig);
}
