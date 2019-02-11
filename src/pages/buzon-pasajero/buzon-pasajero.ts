import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ISubscription } from "rxjs/Subscription";
import{HomePage} from '../home/home';
import { VerRutaDesdePasajeroPage } from '../ver-ruta-desde-pasajero/ver-ruta-desde-pasajero';
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

  email;
  suscrito1:ISubscription;
  rama;
  solicitudes=[];
  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email=this.navParams.get('email');
    this.rama=this.email.split('.');
    console.log(this.rama[0]);

    this.servicio.getMisSolicitudesRef(this.rama[0]).valueChanges().subscribe(
      info=>{
        this.solicitudes=info;
        console.log(info);
        
      }
    );
    
    
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
    this.navCtrl.push(HomePage,{email:this.email,obj:obj,rama:this.rama});
  }
  activada(obj){
    let fechahora=obj.fecha.split('|');
    let aux=this.email.split('.');
    let varia=aux[0]+fechahora[0]+fechahora[1];
    let caux:any;
    let diferentes=[];
    this.suscrito1=this.servicio.getlatlon(obj.de,varia).valueChanges().subscribe(
      data =>{
        for(caux of data)
        {
          diferentes.push(caux);
        }
      }
    );
    setTimeout(() => {
    this.suscrito1.unsubscribe();
    let latitud=diferentes[5];
    let longitud=diferentes[6];
    
    var nav = this.app.getRootNav();
    nav.setRoot(VerRutaDesdePasajeroPage,{email:this.email,otro:obj.de+'.com',latitud:latitud,longitud:longitud});
    }, 1000);
  }
}
