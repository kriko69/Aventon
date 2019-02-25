import { rutaprogramada } from './../../interfaces/ruta.programada.interface';
import { BuzonPage } from './../buzon/buzon';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { mysqlService } from '../../services/mysql.service';

/**
 * Generated class for the AceptarSolicitudPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aceptar-solicitud',
  templateUrl: 'aceptar-solicitud.html',
})
export class AceptarSolicitudPage {

  id_usuario;
  solicitud;
  id_auto;
  splitFecha;
  splitHora;
  aux;
  ruta:any={};
    capacidad;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,public alerta:AlertController,private platform:Platform,
  public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);

    this.id_usuario=this.navParams.get('id_usuario');
    this.solicitud=this.navParams.get('solicitud');
    this.id_auto=this.navParams.get('id_auto');

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AceptarSolicitudPage');
  }

  actualizarEstado()
  {
    this.mysql.obtenerCapacidadViaje(this.solicitud.id_viaje).subscribe(
      (data)=>{
        this.capacidad=data;
      }
    );
    setTimeout(() => {
      this.capacidad=Number(this.capacidad);
      if(this.capacidad>0)
      {
        let info;
        this.mysql.actualizarEstadoSolicitud(Number(this.solicitud.id_solicitud),'Aceptado').subscribe(
          (data)=>{
            console.log(data);
          },error=>{
            console.log(error);
          }
        );
        this.mysql.actualizarCapacidad(this.capacidad-1,Number(this.solicitud.id_viaje)).subscribe(
          (data)=>{
            console.log(data);
          },error=>{
            console.log(error);
          }
        );
        this.mysql.agregarrecogida(Number(this.solicitud.latitud),Number(this.solicitud.longitud),this.solicitud.id_de,this.solicitud.id_viaje).subscribe(
          (data)=>{
            console.log(data);
          },error=>{
            console.log(error);
          }
        );
        this.navCtrl.setRoot(BuzonPage,{id_usuario:this.id_usuario,id_auto:this.id_auto});
      }
      else{
        this.mostrarAlerta();
        this.navCtrl.setRoot(BuzonPage,{id_usuario:this.id_usuario,id_auto:this.id_auto});
      }
    }, 1000);
  }
  actualizarEstadono()
  {
        this.mysql.actualizarEstadoSolicitud(Number(this.solicitud.id_solicitud),'Rechazado').subscribe(
          (data)=>{
            console.log(data);
          },error=>{
            console.log(error);
          }
        );
        this.navCtrl.setRoot(BuzonPage,{id_usuario:this.id_usuario,id_auto:this.id_auto});

  }
  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'No se puede Aceptar!',
      subTitle: 'No existe capacidad de esa ruta para un nuevo pasajero.',
      buttons: ['OK']
    });
    alert.present();
  }

  nuevaruta(ruta,lati,longi){
    console.log(ruta);
    console.log(lati+'/'+longi);
    
    
    let latlong;
    let lat;let long;
    let distancia;
    let puntos=ruta.split(';');
    let dismin=10000;let latlongmin=puntos[0];
    for(let i=0;i<puntos.length;i++){
        latlong=puntos[i].split('/');
        lat=Number(latlong[0]);
        long=Number(latlong[1]);
        distancia=this.getKilometros(lati,longi,lat,long);
        console.log('DISTANCIA: '+distancia);
        if(distancia<dismin){
            dismin=distancia;
            latlongmin=puntos[i];
        }
    }
    let cadena='';    
    for(let i=0;i<puntos.length;i++){
      cadena=cadena+puntos[i];
      if(latlongmin==puntos[i])
      {
        cadena=cadena+';'+lati+'/'+longi;
      }
      if(i+1!=puntos.length){
        cadena=cadena+';';
      }
      }
      return cadena;
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
 return d.toFixed(3); //Retorna tres decimales
  }
}
