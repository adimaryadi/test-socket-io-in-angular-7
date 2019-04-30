import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private route: Router, private socket: Socket) { }

  cekToken() {
    
  }
}
