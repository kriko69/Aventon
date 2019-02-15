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
  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,private platform:Platform,public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario=this.navParams.get('id_usuario');

     this.mysql.listarSolicitudes(this.id_usuario,'todo').subscribe(
      data => {
        console.log('data',data);
        console.log('exito');
        this.solicitudes=Object.assign(data);

        }, (error: any)=> {
          console.log('error', error);

        }
    );
    setTimeout(()=>{
      console.log(this.solicitudes);
      if(this.solicitudes['message']!=this.value){
        this.value='Si se encontro';
      }
      else{
        this.solicitudes=[];
      }
      console.log(this.value);
      //aqui se acomoda los puntos de parada
    },3000);
    
    
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
