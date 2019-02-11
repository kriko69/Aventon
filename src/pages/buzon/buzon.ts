import { AceptarSolicitudPage } from './../aceptar-solicitud/aceptar-solicitud';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { CalificacionPage } from '../calificacion/calificacion';

/**
 * Generated class for the BuzonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buzon',
  templateUrl: 'buzon.html',
})
export class BuzonPage {
  email;
  rama;
  solicitudes=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService ,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email=this.navParams.get('email');
    this.rama=this.email.split('.');
    this.servicio.getSolicitudesRef(this.rama[0]).valueChanges().subscribe(
      data=>{
        this.solicitudes=data;
        console.log(this.solicitudes);

      }
    );
    for(let i=0;i<this.solicitudes.length;i++)
    {
      if(this.solicitudes[i].emails=='')
      {
        this.solicitudes.splice(i, 1);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuzonPage');
  }

  aceptar(solicitud)
  {
    this.navCtrl.push(AceptarSolicitudPage,{email:this.email,solicitud:solicitud});
  }
  calif(obj)
  {
    this.navCtrl.push(CalificacionPage,{email:this.email,obj:obj,rama:this.rama});
  }
}
