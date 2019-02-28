import { Reserva } from './../../interfaces/reserva.interface';
import { PuntoRecogidaReservaPage } from './../punto-recogida-reserva/punto-recogida-reserva';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { VerProgramadasPasajeroPage } from '../ver-programadas-pasajero/ver-programadas-pasajero';
import { firebaseService } from '../../services/firebase.service';
import { OpcionReservaPage } from '../opcion-reserva/opcion-reserva';
import { mysqlService } from '../../services/mysql.service';

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

  id_usuario;
  solicitudes=[];
  value='No se encontró';
  boleano=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modal:ModalController,
  public servicio:firebaseService,private platform:Platform,public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario=this.navParams.get('id_usuario');

    let info;
    this.mysql.listarMisSolicitudesAceptadas(this.id_usuario).subscribe(
      data => {
        console.log('data',data);
        console.log('exito');
        info=Object.assign(data);

        }, (error: any)=> {
          console.log('error', error);

        }
    );
    setTimeout(()=>{
      if(info!=undefined){
      if(info['message']!=this.value){
        this.solicitudes=info;
        this.boleano=false;
      }
      }
    },1000);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservaPasajeroPage');
  }

  irProgramadas() {
    this.navCtrl.setRoot(PuntoRecogidaReservaPage,{id_usuario:this.id_usuario});
  }
  irOpcionreserva(reserva:any){

    this.navCtrl.push(OpcionReservaPage,{id_usuario:this.id_usuario,reserva:reserva});
  }
}
