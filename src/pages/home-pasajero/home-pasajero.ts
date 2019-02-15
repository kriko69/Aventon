import { rutaactiva } from './../../interfaces/rutactiva.service';
import { firebaseService } from './../../services/firebase.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { ISubscription } from 'rxjs/Subscription';
import { ConfirmarllevadaPage } from '../confirmarllevada/confirmarllevada';
import { PuntoRecogidaPage } from '../punto-recogida/punto-recogida';
import { mysqlService } from '../../services/mysql.service';

/**
 * Generated class for the HomePasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-pasajero',
  templateUrl: 'home-pasajero.html',
})
export class HomePasajeroPage {
  id_usuario;
  vestimenta;
  latitud;
  longitud;
  viajes=[];
  rutas=[];
  data:any;
  value='No se encontró';
  control1:ISubscription;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController
    ,public servicio:firebaseService,private platform:Platform,public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.id_usuario=this.navParams.get('id_usuario');
    this.latitud=this.navParams.get('latitud');
    this.longitud=this.navParams.get('longitud');
    this.vestimenta=this.navParams.get('vestimenta');
    
    this.mysql.listarRuta_viaje('activa').subscribe(
      data => {
        console.log('data',data);
        console.log('exito');
        this.rutas=Object.assign(data);

        }, (error: any)=> {
          console.log('error', error);

        }
    );
    setTimeout(()=>{
      console.log(this.rutas);
      if(this.rutas['message']!=this.value){
        this.value='Si se encontro';
      }
      else{
        this.rutas=[];
      }
      console.log(this.value);
      //aqui se acomoda los puntos de parada
    },3000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViajePage');
  }
  distancia(data){
    let latlong;
    let lat;let long;
    let distancia;
    let puntos='';
    if(data.ruta!=undefined && data.ruta!=null)
      puntos=data.ruta.split(';');
    for(let i=0;i<puntos.length;i++){
        latlong=puntos[i].split('/');
        lat=Number(latlong[0]);
        long=Number(latlong[1]);
        distancia=this.getKilometros(this.latitud,this.longitud,lat,long);
        console.log('DISTANCIA: '+distancia);
        if(distancia<=0.5 && data.ci!=this.id_usuario){
            this.viajes.push(data);
            break;
        }
    }
  }
  getKilometros(lat1,lon1,lat2,lon2)
  {
  let rad = function(x) {return x*Math.PI/180;}
 var R = 6378.137; //Radio de la tierra en km
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
 var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  d=d+0.2;
 return d.toFixed(3); //Retorna tres decimales
  }
  seleccion(data){
    this.navCtrl.setRoot(ConfirmarllevadaPage,{data:data,id_usuario:this.id_usuario,latitud:this.latitud,longitud:this.longitud});

  }
  dismiss(){
    this.navCtrl.setRoot(PuntoRecogidaPage,{id_usuario:this.id_usuario});
  }

}
