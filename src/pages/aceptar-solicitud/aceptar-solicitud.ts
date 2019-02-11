import { rutaprogramada } from './../../interfaces/ruta.programada.interface';
import { BuzonPage } from './../buzon/buzon';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';

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

  email;
  solicitud;
  rama;
  nombreRama;
  nombreRama2;
  nombreRamaRutaProgramada;
  splitFecha;
  splitHora;
  aux;
  ruta:any={};
  nuevaCapacidad={
    capacidad:0,
    puntosRecogidas:'',
    integrantes:'',
    ruta:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,public alerta:AlertController,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email=this.navParams.get('email');
    console.log(this.email);
    this.solicitud=this.navParams.get('solicitud');
    console.log(this.solicitud);
    console.log(this.solicitud.de);
    this.rama=this.email.split('.');
    console.log(this.solicitud.fechaViaje);
    this.splitFecha=this.solicitud.fechaViaje.split('-');
    this.splitHora=this.solicitud.horaViaje.split(':');
    console.log(this.solicitud.horaViaje);
    this.nombreRama=this.solicitud.de+''+this.solicitud.fechaViaje+''+this.solicitud.horaViaje;
    this.nombreRama2=this.rama[0]+''+this.solicitud.fechaViaje+''+this.solicitud.horaViaje;

    this.nombreRamaRutaProgramada=this.rama[0]+this.splitFecha[0]+this.splitFecha[1]+this.splitFecha[2]+this.splitHora[0]+this.splitHora[1];
    console.log(this.nombreRamaRutaProgramada);

    this.servicio.getRutaProgramada(this.nombreRamaRutaProgramada).valueChanges().subscribe(
      (data)=>{
        this.ruta=data;
        console.log(this.ruta);
      }
    );

    console.log(this.nuevaCapacidad);



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AceptarSolicitudPage');
  }

  actualizarEstado()
  {
    if(this.ruta[2]!=0)
    {
      this.capacidadDiferenteA0();
    }
    else{
      this.mostrarAlerta();
    }
  }

  capacidadDiferenteA0()
  {
    this.servicio.editarSolicitud(this.rama[0],this.nombreRama,'aceptado').then(
      ()=>{
        console.log('actualizado');

      }
    );
    this.servicio.editarMiSolicitud(this.solicitud.de,this.nombreRama2,'aceptado').then(
      ()=>{
        console.log('actualizado');

      }
    );
    this.nuevaCapacidad.capacidad=this.ruta[2];
    console.log(this.nuevaCapacidad.capacidad);

   this.nuevaCapacidad.ruta=this.nuevaruta(this.ruta[11],this.solicitud.latitud,this.solicitud.longitud);

    this.nuevaCapacidad.capacidad=this.nuevaCapacidad.capacidad-1;
    this.nuevaCapacidad.puntosRecogidas=this.ruta[10]+this.solicitud.latitud+'/'+this.solicitud.longitud+';';
    this.nuevaCapacidad.integrantes=this.ruta[7]+this.solicitud.de+';';
    this.servicio.editarCapaci(this.nombreRamaRutaProgramada,this.nuevaCapacidad).then(
      ()=>{
        console.log('actualizado la capacidad');

      }
    );
    this.navCtrl.setRoot(BuzonPage,{email:this.email});
  }

  actualizarEstadono()
  {
    this.servicio.editarSolicitud(this.rama[0],this.nombreRama,'no aceptado').then(
      ()=>{
        console.log('actualizado');

      }
    );
    this.servicio.editarMiSolicitud(this.solicitud.de,this.nombreRama2,'no aceptado').then(
      ()=>{
        console.log('actualizado');

      }
    );

    this.navCtrl.setRoot(BuzonPage,{email:this.email});

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
