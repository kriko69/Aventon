import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PuntoRecogidaPage } from '../punto-recogida/punto-recogida';
import { HomePasajeroPage } from '../home-pasajero/home-pasajero';
import { firebaseService } from '../../services/firebase.service';

/**
 * Generated class for the Vestimenta1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vestimenta1',
  templateUrl: 'vestimenta1.html',
})
export class Vestimenta1Page {
  data={
    zsombrero:'',
    zsuperior:'',
    zinferior:'',
    zaccesorio:''
  };
  id_usuario;latitud;longitud;
  isgorra=false;
  ace='No lleva ningun accesorio';
  constructor(public navCtrl: NavController, public navParams: NavParams,private platform:Platform,
    public servicio:firebaseService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
  this.latitud=this.navParams.get('latitud');
  this.longitud=this.navParams.get('longitud');
  this.id_usuario=this.navParams.get('id_usuario');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VestimentaPage');
  }
  registrar(data){
    if(this.isgorra==false){
      data.zsombrero='No lleva sombrero ni gorra.';
    }
    data.zaccesorio=this.ace;
   this.navCtrl.setRoot(HomePasajeroPage,{id_usuario: this.id_usuario,latitud:this.latitud,longitud:this.longitud,vestimenta:this.data});
  }
  dismiss(){
        
    console.log(this.ace);
    this.navCtrl.setRoot(PuntoRecogidaPage,{id_usuario: this.id_usuario});
  }
  valor(acec){
    this.ace=acec;
  }
  valor1(){
    this.data.zsombrero='';
  }
}
