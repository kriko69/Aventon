import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { VerMiRutaPage } from '../ver-mi-ruta/ver-mi-ruta';
import { firebaseService } from '../../services/firebase.service';
import { ISubscription } from 'rxjs/Subscription';

/**
 * Generated class for the EsPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-es-pasajero',
  templateUrl: 'es-pasajero.html',
})
export class EsPasajeroPage {

  correo='';
  capacidad=0;
  suscrito1:ISubscription;
  ruta='';
  foto='';
  info=[];
  nombre='';
  email='';

  gorra='';
  superior='';
  inferior='';
  accesorio='';


  constructor(public navCtrl: NavController, public navParams: NavParams,
  private servicio:firebaseService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.correo=navParams.get('correo');
    let aux=this.correo.split('.');
    this.capacidad=navParams.get('capacidad');
    this.ruta=navParams.get('ruta');
    this.foto='../../assets/imgs/'+aux[0]+'.jpg';
    this.email = this.navParams.get('email');
    this.suscrito1=this.servicio.obtenerInfo(aux[0]).valueChanges().subscribe(
      (data)=>{
        this.info=data;
        console.log(this.info);
        this.nombre=this.info[9]+' '+this.info[0];
        this.gorra=this.info[16];
        this.superior=this.info[17];
        this.inferior=this.info[15];
        this.accesorio=this.info[14];
      }
    );
    setTimeout(() => {
      this.suscrito1.unsubscribe();
    }, 1000);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EsPasajeroPage');
  }

  aceptar()
  {
    this.nombre='';
    this.info=[];
    this.navCtrl.setRoot(VerMiRutaPage,{email:this.email,capacidad:this.capacidad,ruta:this.ruta});
  }

}
