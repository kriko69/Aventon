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

  ci;
  id_viaje;
  fecha;
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.ci=this.navParams.get('ci');
    this.fecha=this.navParams.get('fecha');
    this.id_viaje=this.navParams.get('id_viaje');
    this.data=this.ci+'|'+this.fecha+'|'+this.id_viaje;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerMiQrPage');
  }

}
