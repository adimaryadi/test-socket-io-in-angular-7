import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../config/config.service';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private config: ConfigService) { }

  ngOnInit() {
    let token   =   localStorage.getItem('token');
    setTimeout(() => {
      this.config.TokenCek(token);
    }, 1000);
  }

}
