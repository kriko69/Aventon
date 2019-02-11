import { Reserva } from './../../interfaces/reserva.interface';
import { PuntoRecogidaReservaPage } from './../punto-recogida-reserva/punto-recogida-reserva';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { VerProgramadasPasajeroPage } from '../ver-programadas-pasajero/ver-programadas-pasajero';
import { firebaseService } from '../../services/firebase.service';
import { OpcionReservaPage } from '../opcion-reserva/opcion-reserva';

/**
 * Generated class for the ReservaPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserva-pasajero',
  templateUrl: 'reserva-pasajero.html',
})
export class ReservaPasajeroPage {

  email;
  rama;
  solicitudes=[];
  aux;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modal:ModalController,
  public servicio:firebaseService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email=this.navParams.get('email');
    console.log(this.email);
    this.rama=this.email.split('.');
    this.servicio.getMisSolicitudesRef(this.rama[0]).valueChanges().subscribe(
      data=>{
        for(this.aux of data)
        {
          if(this.aux.estado=='aceptado')
          {
            this.solicitudes.push(this.aux);
          }
        }
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservaPasajeroPage');
  }

  irProgramadas() {
    this.navCtrl.setRoot(PuntoRecogidaReservaPage,{email:this.email});
  }
  irOpcionreserva(reserva:any){
    
    this.navCtrl.push(OpcionReservaPage,{email:this.email,reserva:reserva});
  }
}
