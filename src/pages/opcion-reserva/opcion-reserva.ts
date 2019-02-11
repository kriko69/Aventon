import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ReservaPasajeroPage } from '../reserva-pasajero/reserva-pasajero';

/**
 * Generated class for the OpcionReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opcion-reserva',
  templateUrl: 'opcion-reserva.html',
})
export class OpcionReservaPage {

  email;
  reserva;
  ruta={
    capacidad:0
  }
  rama;
  nombrerama;
  nombrerama2;
  fecha;
  hora;
  nombrerama3;
  info=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email=this.navParams.get('email');
    this.reserva=this.navParams.get('reserva');
    console.log(this.email);
    console.log(this.reserva);
    this.rama=this.email.split('.');
    this.nombrerama=this.reserva.a+this.reserva.fechaViaje+this.reserva.horaViaje;
    this.nombrerama2=this.rama[0]+this.reserva.fechaViaje+this.reserva.horaViaje;
    this.fecha=this.reserva.fechaViaje.split('-');
    this.hora=this.reserva.horaViaje.split(':');
    this.nombrerama3=this.reserva.a+this.fecha[0]+this.fecha[1]+this.fecha[2]+this.hora[0]+this.hora[1];
    console.log(this.nombrerama);
    console.log(this.nombrerama2);
    console.log(this.nombrerama3);

    this.servicio.dameCapacidadRuta(this.nombrerama3).valueChanges().subscribe(
      (datas)=>{
        console.log(datas);
        this.info=datas;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpcionReservaPage');
  }

  eliminarReserva()
  {

    console.log(this.rama[0]);
    console.log(this.nombrerama);
    this.ruta.capacidad=this.info[2]+1;
    this.servicio.editarCapacidadAlCancelar(this.nombrerama3,this.ruta);
    this.servicio.eliminarSolicitud(this.nombrerama2,this.reserva.a);
    this.servicio.eliminarMiSolicitud(this.nombrerama,this.rama[0]).then(
      ()=>{
        console.log('se elimino reserva');
        this.navCtrl.setRoot(ReservaPasajeroPage,{email:this.email});
      }
    );
  }

}
