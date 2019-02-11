import { VehiculoPage } from './../vehiculo/vehiculo';
import { Vehiculo } from './../../interfaces/vehiculo.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';

/**
 * Generated class for the AgregarVehiculosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar-vehiculos',
  templateUrl: 'agregar-vehiculos.html',
})
export class AgregarVehiculosPage {

  public auto:Vehiculo={
    capacidad:0,
    color:'',
    maletera:false,
    marca:'',
    modelo:2000,
    placa:''
  };
  email;
  aux;
  rama;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,public toast:ToastService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email=navParams.get('email');
    this.aux=this.email.split('.');
    this.rama=this.aux[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarVehiculosPage');
  }

  agregar()
  {
    this.servicio.definirAutoRef(this.auto.placa,this.rama);
    this.servicio.addAuto(this.auto).then(ref=>{ //agrego
      //si se tiene exito
      this.toast.show(`Vehiculo ${this.auto.marca} ${this.auto.placa} agregado!`);
      this.navCtrl.setRoot(VehiculoPage,{email: this.email}); //redirigir login
      console.log("se agrego");
      
    })
  }


}
