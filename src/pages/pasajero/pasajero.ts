import { PuntoRecogidaPage } from './../punto-recogida/punto-recogida';
import { OpcionesPasajeroPage } from './../opciones-pasajero/opciones-pasajero';
import { BuzonPasajeroPage } from './../buzon-pasajero/buzon-pasajero';
import { HomePasajeroPage } from './../home-pasajero/home-pasajero';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ReservaPasajeroPage } from '../reserva-pasajero/reserva-pasajero';

/**
 * Generated class for the PasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pasajero',
  templateUrl: 'pasajero.html',
})
export class PasajeroPage {

  tab1:any;
  tab2:any;
  tab3:any;
  tab4:any;
  rootparamspage;
  constructor(public navCtrl: NavController, public navParams: NavParams,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    let id_usuario = navParams.get('id_usuario');
    console.log('id pass',id_usuario);

    this.rootparamspage={id_usuario: id_usuario};
    this.tab1 = PuntoRecogidaPage;
    this.tab2 = ReservaPasajeroPage;
    this.tab3=BuzonPasajeroPage;
    this.tab4=OpcionesPasajeroPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasajeroPage');
  }

}
