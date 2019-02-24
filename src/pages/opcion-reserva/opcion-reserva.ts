import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ReservaPasajeroPage } from '../reserva-pasajero/reserva-pasajero';
import { mysqlService } from '../../services/mysql.service';

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

  id_usuario;
  reserva;
  ruta={
    capacidad:0
  }
  info=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,private platform:Platform,public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);

    this.id_usuario=this.navParams.get('id_usuario');
    this.reserva=this.navParams.get('reserva');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpcionReservaPage');
  }

  eliminarReserva()
  {
    let info;
    let capacidad;
    this.mysql.eliminarSolicitud(this.reserva.id_solicitud).subscribe(
      data => {
        console.log('data', data);
        info= Object.assign(data);
        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

        }
    );
    setTimeout(()=>{
      this.mysql.obtenerCapacidadViaje(this.reserva.id_viaje).subscribe(
        data=>{
          console.log(data);
          capacidad=data;
        },(error)=>{
          console.log(error);
  
        }
      );
      setTimeout(()=>{
        capacidad=Number(capacidad)+1;
        this.mysql.actualizarCapacidad(capacidad,this.reserva.id_viaje).subscribe(
          data=>{
            console.log(data);
          },(error)=>{
            console.log(error);
  
          }
        );
        setTimeout(()=>{

          this.navCtrl.setRoot(ReservaPasajeroPage,{id_usuario:this.id_usuario/*,id_auto:this.id_auto*/});

        });
  
      },1000);

    },1000);
  }

}
