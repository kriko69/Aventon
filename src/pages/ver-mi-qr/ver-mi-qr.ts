import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the VerMiQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-mi-qr',
  templateUrl: 'ver-mi-qr.html',
})
export class VerMiQrPage {

  data;
  email;
  fechaHora;
  constructor(public navCtrl: NavController, public navParams: NavParams,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email=this.navParams.get('email');
    this.fechaHora=this.navParams.get('fechaHora');
    this.data=this.email+'|'+this.fechaHora;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerMiQrPage');
  }

}
