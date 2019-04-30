import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EnkripsiService {

  constructor() { }
  // adiprogrammingExpertforminten
  
  kunciEnkripsi       =     'adiprogrammingExpertforminten';

  enkripsi(data) {
    try {
      let enkrip         =   CryptoJS.AES.encrypt(data, this.kunciEnkripsi).toString();
      return enkrip;
    } catch (pusing) {
       console.log(pusing + ' Gagal Mengenkripsi data');
    }
  }

  token(data,ipaddr) {
    try {
      let token         =  CryptoJS.AES.encrypt(data,ipaddr).toString();
      return token;
    } catch (pusing) {
      console.log(pusing + ' Token tidak bisa di buat');
    }
  }

  Terjemaah(data) {
    try {
      let terjemaah      =     CryptoJS.AES.decrypt(data, this.kunciEnkripsi);
      let hasil          =     terjemaah.toString(CryptoJS.enc.Utf8);
      return hasil;
    } catch (pusing) {
      console.log(pusing + ' Gagal Menerjemaahkan data');
    }
  }
}
