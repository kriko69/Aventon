import { Component } from '@angular/core';
import { NavController,NavParams, Platform } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";
import { firebaseService } from './../../services/firebase.service';
import { BuzonPasajeroPage } from '../buzon-pasajero/buzon-pasajero';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rate : any = 0;
  obj:any;
  email;
  constructor(public navCtrl: NavController,public navParams: NavParams,public servicio:firebaseService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email = this.navParams.get('email');
    this.obj=this.navParams.get('obj');
  }

  onModelChange(event){
  	this.rate = event;
  	console.log(event);
  }
  calif(){
    this.obj.estado='Calificado';
    this.servicio.upca(this.email,this.obj);
    let aux=this.obj.de.split('.');
    let aux1=this.email.split('.');
    this.servicio.calif(aux1[0],aux[0],this.rate,this.obj.fecha);
    this.navCtrl.setRoot(BuzonPasajeroPage,{email:this.email});
  }
}