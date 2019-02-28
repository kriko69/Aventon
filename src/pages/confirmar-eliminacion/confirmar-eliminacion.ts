import { mysqlService } from './../../services/mysql.service';
import { ReservaPasajeroPage } from './../reserva-pasajero/reserva-pasajero';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';

/**
 * Generated class for the ReservarProgramadasPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { firebaseService } from '../../services/firebase.service';
import { PasajeroPage } from '../pasajero/pasajero';
import { ToastService } from '../../services/toast.service';
import { OpcionesConductorPage } from '../opciones-conductor/opciones-conductor';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-confirmar-eliminacion',
  templateUrl: 'confirmar-eliminacion.html',
})
export class ConfirmarEliminacionPage {
  markersArray = [];
  markeraux:any;
  latOri  = -16.503720;
  longOri = -68.131247;
  map: any;
  email;
  ruta:any;
  id_usuario;
  id_auto;
  nombre_ruta;
  id_ruta;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public mysql:mysqlService, public alerta:AlertController, public toast: ToastService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario = this.navParams.get('id_usuario');
    this.id_auto = this.navParams.get('id_auto');
    this.nombre_ruta = this.navParams.get('nombre_ruta');
    this.id_ruta = this.navParams.get('id_ruta');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservarProgramadasPasajeroPage');
    this.submit();
  }
  si(){
    /*this.servicio.eliminarRuta(this.ruta.nombre,this.ruta.correousuario).then(
      ()=>{
        this.toast.show(` Ruta eliminada!`);
        this.navCtrl.setRoot(OpcionesConductorPage,{email: this.email});
      }
    );*/
    this.mysql.EliminarRuta(this.id_ruta).subscribe(
      data=>{
        console.log(data);
        if(data['message']=='OK')
        {
          this.toast.show(` Ruta eliminada!`);
          this.navCtrl.setRoot(OpcionesConductorPage,{id_usuario: this.id_usuario,id_auto:this.id_auto});
        }
      },(error)=>{
        console.log(error);
      }
    );
  }
  no(){
        this.toast.show(` CANCELADO!`);
        this.navCtrl.setRoot(OpcionesConductorPage,{id_usuario:this.id_usuario,id_auto:this.id_auto});
  }

  /*cambiar(valor:string)
  {
    let aux1,aux2;
    aux1=valor.substring(0,3);
    aux2=valor.substr(3,valor.length);
    return aux1+'.'+aux2;
  }*/
  /*recargar(){
    let points=this.ruta.puntos;
    this.markersArray=[];
    let latlon=points.split(';');
    let aux:any;
    console.log(latlon);
    let puntos=latlon.length;
    console.log(puntos);
    for(let i=0;i<puntos;i++)
    {
      aux=latlon[i];
      let partida=aux.split('/');
      this.markeraux = new google.maps.Marker({position: {lat: Number(partida[0]), lng: Number(partida[1])},map: this.map,draggable: false});
      console.log(Number(partida[0])+'/'+Number(partida[1]));
      if(i!=0 && i!=puntos-1){
        this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      }
      this.markersArray.push(this.markeraux);
    }
    var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
     directionsDisplay = new google.maps.DirectionsRenderer();
     this.map = new google.maps.Map(document.getElementById('mapita'), {
      center: {lat: this.latOri, lng: this.longOri},
      zoom:15
    });
    let waypts=[];
    for(let i=0;i<puntos;i++){
    waypts.push({
      location: this.markersArray[i].getPosition(),
      stopover: false
    });}
    console.log(waypts);
    directionsDisplay.setMap(this.map);
     var start = this.markersArray[0].getPosition();
     var end = this.markersArray[puntos-1].getPosition();
     var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
      waypoints: waypts
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
      }else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    for(let i=1;i<puntos-1;i++){
      this.markersArray[i].setMap(this.map);
    }
  }*/
  submit(){
    let info;
    console.log('ruta',this.nombre_ruta);
    console.log('usuario',this.id_usuario);
    this.mysql.obtenerPuntosDeRuta(this.nombre_ruta,this.id_usuario).subscribe(
      data=>{
        console.log('puntos rutas: ',data);
        info=data;
      },(error)=>{
        console.log(error);
      }
    );
    setTimeout(()=>{
      if(info!=undefined){
      this.recargar(info);
      }
    },1000);
  }
  recargar(points){
    this.markersArray=[];

    let latitud,longitud;
    for(let i=0;i<points.length;i++)
    {
      latitud=Number(points[i].latitud);
      longitud=Number(points[i].longitud);
      this.markeraux = new google.maps.Marker({position: {lat: latitud, lng: longitud},map: this.map,draggable: false});
      console.log(latitud+'/'+longitud);
      if(i!=0 && i!=points.length-1){
        this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      }
      this.markersArray.push(this.markeraux);
    }
    let arrayaux=[];
    for(let i=0;i<points.length;i++)
    {
      arrayaux[i]=this.markersArray[i];
    }
    var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
     directionsDisplay = new google.maps.DirectionsRenderer();
     this.map = new google.maps.Map(document.getElementById('mapita'), {
      center: {lat: this.latOri, lng: this.longOri},
      zoom:15
    });
    let waypts=[];
    for(let i=0;i<points.length;i++){
    waypts.push({
      location: this.markersArray[i].getPosition(),
      stopover: false
    });}
    console.log(waypts);
    this.map = new google.maps.Map(document.getElementById('mapita'));
    directionsDisplay.setMap(this.map);
     var start = this.markersArray[0].getPosition();
     var end = this.markersArray[points.length-1].getPosition();
     var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
      waypoints: waypts
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
      }else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    for(let i=1;i<points.length-1;i++){
      this.markersArray[i].setMap(this.map);
    }

  }
  dismiss()
  {
    this.navCtrl.setRoot(ReservaPasajeroPage,{email: this.email});
  }
}
