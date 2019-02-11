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
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public alerta:AlertController, public toast: ToastService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email=this.navParams.get('email');
    this.ruta=this.navParams.get('ruta');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservarProgramadasPasajeroPage');
    this.recargar();
  }
  si(){
    this.servicio.eliminarRuta(this.ruta.nombre,this.ruta.correousuario).then(
      ()=>{
        this.toast.show(` Ruta eliminada!`);
        this.navCtrl.setRoot(OpcionesConductorPage,{email: this.email});
      }
    );
  }
  no(){
        this.toast.show(` CANCELADO!`);
        this.navCtrl.setRoot(OpcionesConductorPage,{email: this.email});
  }
  recargar(){
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
  }
  dismiss()
  {
    this.navCtrl.setRoot(ReservaPasajeroPage,{email: this.email});
  }
}
