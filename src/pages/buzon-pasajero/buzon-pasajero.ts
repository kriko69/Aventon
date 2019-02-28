import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ISubscription } from "rxjs/Subscription";
import{HomePage} from '../home/home';
import { VerRutaDesdePasajeroPage } from '../ver-ruta-desde-pasajero/ver-ruta-desde-pasajero';
import { mysqlService } from '../../services/mysql.service';
/**
 * Generated class for the BuzonPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buzon-pasajero',
  templateUrl: 'buzon-pasajero.html',
})
export class BuzonPasajeroPage {

  id_usuario;
  suscrito1:ISubscription;
  solicitudes=[];
  value='No se encontró';
  boleano=true;
  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,private platform:Platform,public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario=this.navParams.get('id_usuario');

     this.mysql.listarSolicitudesPasajero(this.id_usuario).subscribe(
      data => {
        console.log('data',data);
      if(data['message']==this.value || data==undefined){
        this.solicitudes=[];
        console.log('exito');
      }
      else
        {this.solicitudes=Object.assign(data);
          this.boleano=false;}

        }, (error: any)=> {
          console.log('error', error);

        }
    );
    setTimeout(()=>{
      console.log(this.solicitudes);
    },1000);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuzonPasajeroPage');
  }



  mostrar(solicitud)
  {
    console.log(solicitud);

  }
  calif(obj)
  {
    this.navCtrl.push(HomePage,{id_usuario:this.id_usuario,obj:obj});
  }
  
  activada(obj){
    var nav = this.app.getRootNav();
    nav.setRoot(VerRutaDesdePasajeroPage,{id_usuario:this.id_usuario,solicitud:obj});
  }
}
