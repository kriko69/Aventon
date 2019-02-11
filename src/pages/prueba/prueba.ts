import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { VerMiRutaPage } from '../ver-mi-ruta/ver-mi-ruta';
import { firebaseService } from '../../services/firebase.service';
import { ISubscription } from 'rxjs/Subscription';
/**
 * Generated class for the PruebaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prueba',
  templateUrl: 'prueba.html',
})
export class PruebaPage {

  correo='';
  capacidad=0;
  suscrito1:ISubscription;
  ruta='';
  foto='';
  info=[];
  nombre='';
  email='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private servicio:firebaseService,private platform:Platform, private toast:ToastController) {
    this.aceptar();
    this.platform.registerBackButtonAction(() => {
      this.show("backPressed 1");
    },10000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EsPasajeroPage');
  }
  show(mensaje:string)
    {
        return this.toast.create({
            message: mensaje,
            duration:3000
        }).present();
    }

  aceptar()
  {
    let caux:any;
    this.suscrito1=this.servicio.pruebaRef().valueChanges().subscribe(
      (data)=>{
        this.info=[];
        for(caux of data)
        {
        this.info.push(caux);
        }
        this.info.sort(function (a, b) {
          if (a.fecha > b.fecha) {
            return 1;
          }
          if (a.fecha < b.fecha) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        console.log(this.info);
        
      }
    );
  }

}
