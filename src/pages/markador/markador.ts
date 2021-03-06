import { mysqlService } from './../../services/mysql.service';
import { VerMiRutaPage } from './../ver-mi-ruta/ver-mi-ruta';
import { rutaactiva } from './../../interfaces/rutactiva.service';
import { firebaseService } from './../../services/firebase.service';
import { Component, NgModule } from '@angular/core';
import {IonicPage, NavController, Platform, NavParams, AlertController,ModalController, LoadingController } from 'ionic-angular';

//IMPORTAR GEOLOCALIZACIÓN DE GOOGLE
import { Geolocation } from '@ionic-native/geolocation';
import{Ruta} from '../../interfaces/rutas.interface';
import { AddRutaPage } from '../add-ruta/add-ruta';
import { MisRutasPage } from '../mis-rutas/mis-rutas';
import { OpcionesConductorPage } from '../opciones-conductor/opciones-conductor';
import { AddrutaproPage } from '../addrutapro/addrutapro';

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-markador',
  templateUrl: 'markador.html'
})

export class MarkadorPage {
  text;
  isenabled: boolean=false;
  isenabled1:boolean=false;
  isenabled2:boolean=true;
  isenabled3:boolean=false;
  //isenabled1: booblguardar=false;
  ruta:Ruta={
    puntos:'',
    correousuario:'',
    placa:'',
    precio:0
  };
  monto=0;
  nombreruta:any;
  map: any;
  email='';
  capacidad;
  placa;
latUCB  = -16.523098;
longUCB = -68.112290;
  latOri  = -16.503720;
  longOri = -68.131247;
  markersArray = [];
  contador=0;
  markeraux:any;

  id_usuario;
  id_auto;
  nombre_ruta;
  id_ruta;
  pageanterior
  constructor(public navCtrl: NavController, public alerta:AlertController,public geolocation: Geolocation, public platform:Platform,
    public navParams:NavParams,public load:LoadingController,public servicio:firebaseService,public modalCtrl:ModalController, public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.id_usuario = this.navParams.get('id_usuario');
    this.id_auto = this.navParams.get('id_auto');
    this.pageanterior = this.navParams.get('pageanterior');
    console.log(this.pageanterior);

  }
  ionViewDidLoad() { this.geolocation.getCurrentPosition().then((result) => {
    this.latOri = result.coords.latitude;
    this.longOri = result.coords.longitude;
  }).catch(function(e) {
    console.log('2-error')
    alert('GPS desativado. Verifique!')
  });this.loadMap(this.latOri,this.longOri);
    }
//funcion para cargar un mapa limpio con un marker movible
  private loadMap(latOri, lngOri) {
//reinicio de variables
    this.markersArray=[];
    this.isenabled=false;
    this.isenabled1=false;
    this.isenabled2=true;
    this.isenabled3=false;
    this.contador=0;

      var directionsDisplay = new google.maps.DirectionsRenderer;
     directionsDisplay = new google.maps.DirectionsRenderer();
     this.map = new google.maps.Map(document.getElementById('map'), {
       center: {lat: latOri, lng: lngOri},
       zoom:15
     });
     var miposicion = {lat: latOri, lng: lngOri};
     this.markeraux = new google.maps.Marker({position: miposicion,map: this.map,draggable: true});
     directionsDisplay.setMap(this.map);
     var trafficLayer = new google.maps.TrafficLayer();
     trafficLayer.setMap(this.map);
   }
   //funcion que agrega los marcadores nuevos
   inicio(){
     if(this.contador>=1){
      this.isenabled=true;
     }
    this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    this.markersArray.push(this.markeraux);
    this.contador=this.contador+1;
     this.markersArray[this.contador-1].setDraggable(false);
     this.markeraux = new google.maps.Marker({position: this.markersArray[this.contador-1].getPosition(),map: this.map,draggable: true});
     this.map.setCenter(this.markersArray[this.contador-1].getPosition());
   }
   //funcion recarga el mapa dibujando la ruta y los marcadores de nuevo
   fin(){
    this.isenabled1=true;
    this.isenabled2=false;
    this.isenabled=false;
    this.isenabled3=true;
    var UCB = {lat: this.latUCB, lng: this.longUCB};
    this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    this.markeraux.setPosition(UCB);
    var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
     directionsDisplay = new google.maps.DirectionsRenderer();
    this.markersArray.push(this.markeraux);
    this.contador=this.contador+1;
     this.markersArray[this.contador-1].setDraggable(false);
     this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.latOri, lng: this.longOri},
      zoom:15
    });
    let waypts=[];
    for(let i=0;i<this.contador;i++){
    waypts.push({
      location: this.markersArray[i].getPosition(),
      stopover: false
    });}
    directionsDisplay.setMap(this.map);
     var start = this.markersArray[0].getPosition();
     var end = this.markeraux.getPosition();
     var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
    optimizeWaypoints: true,
      waypoints: waypts
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
      }
    });
    for(let i=1;i<this.contador-1;i++){
      this.markersArray[i].setMap(this.map);
    }
    let text='Ruta generada con exito!';
    this.mostrarAlerta(text); //alerta
   }
   //funcion para guardar los datos
   guardar(data:Ruta){

    console.log('puntos:: ',this.markersArray);

    this.presentPrompt();
  }
  //funcion para mostrar alerta de confirmacion pasando un string
   mostrarAlerta(aux:string) {
     let tit;
     if(aux=='Ocurrio un error, vuelva a intentarlo!'){
      tit='Error';
      try{
        this.mysql.obtenerIdRuta(this.nombre_ruta).subscribe(
          data=>{
            console.log('id_ruta:',data);
            this.id_ruta=data
            console.log('exito');
          },(error)=>{
            console.log(error);
            this.text='Ocurrio un error, vuelva a intentarlo!';
          }
        );
        setTimeout(() => {
          this.mysql.EliminarRuta(this.id_ruta).subscribe(
            data=>{
              console.log(data);
            },(error)=>{
              console.log(error);
            }
          );
        }, 1000);
      }
      catch(e){

      }
     }
     else
      tit='Exito';
    const alert = this.alerta.create({
      title: tit,
      subTitle: aux,
      buttons: ['OK']
    });
    alert.present();
  }
  //funcion para pedir el nombre de la ruta a guardar
  presentPrompt() {
    this.ruta.nombre='Ruta Nueva';
    let alert = this.alerta.create({
      title: 'Nombre de la ruta',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: data => {
              console.log(data.nombre);
              if(data.nombre!='' && data.nombre!=null)
              this.nombre_ruta=data.nombre;
            this.text=this.Agregar();
    this.isenabled1=false;
          }
        },
      {
        text: 'CANCELAR'
      }]
    });
    alert.present();

    console.log(alert);
  }
  seleccinaRuta(){
    let modal=this.modalCtrl.create(AddRutaPage,{id_usuario:this.id_usuario});
    modal.present();
    modal.onDidDismiss(data=>{
      if(data){
        this.recargar(data);
      }
    });
  }
 /* cambiar(valor:string)
  {
    let aux1,aux2;
    aux1=valor.substring(0,3);
    aux2=valor.substr(3,valor.length);
    return aux1+'.'+aux2;
  }*/
  recargar(points:any){
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
    this.isenabled1=true;
    this.isenabled2=false;
    this.isenabled=false;
    var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
     directionsDisplay = new google.maps.DirectionsRenderer();
     this.map = new google.maps.Map(document.getElementById('map'), {
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
    let text='Ruta generada con exito!';
    this.mostrarAlerta(text); //alerta
    for(let i=0;i<points.length;i++)
    {
      this.markersArray[i]=arrayaux[i];
    }
    this.contador=points.length;
    this.isenabled=false;
    this.isenabled1=true;
    this.isenabled2=false;
    this.isenabled3=true;
  }
  presentLoading() {
    const loader = this.load.create({
      content: "Espere por favor...",
      duration: 4000
    });
    loader.present();
  }
Agregar(){
  this.presentLoading();
  this.text='Ruta guardada con exito!';
  this.mysql.agregarRuta(Number(this.id_usuario),this.nombre_ruta).subscribe(
    data=>{
      console.log(data);
      console.log('exito');
    },(error)=>{
      console.log(error);
    }
  );
  setTimeout(()=>{
    this.mysql.obtenerIdRuta(this.nombre_ruta).subscribe(
      data=>{
        console.log('id_ruta:',data);
        this.id_ruta=data
        console.log('exito');
      },(error)=>{
        console.log(error);
        this.text='Ocurrio un error, vuelva a intentarlo!';
      }
    );
    setTimeout(()=>{
      for(let i=0;i<this.markersArray.length;i++){
        let latitud=Number(this.markersArray[i].getPosition().lat());
        let longitud=Number(this.markersArray[i].getPosition().lng());
       console.log('punto: '+this.markersArray[i].getPosition().lat()+"/"+this.markersArray[i].getPosition().lng());
       let posicion=i+1;
        this.mysql.agregarPunto(Number(this.id_ruta),latitud,longitud,posicion).subscribe(
          data=>{
            console.log('puntos:',data);
            this.id_ruta=data
            console.log('exito');
          },(error)=>{
            console.log(error);
            this.text='Ocurrio un error, vuelva a intentarlo!';
          }
        );
      }
      setTimeout(() => {
    this.mostrarAlerta(this.text); //alerta
      },1000);
    },1000);
  },1000);
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
  dameFecha()
  {
    let hoy = new Date();
    let dd = hoy.getDate();
    let mm = hoy.getMonth()+1;
    let yyyy = hoy.getFullYear();
    let hora=''+hoy.getHours();
    let minutos=''+hoy.getMinutes();
    let segundos=''+hoy.getSeconds();
    if(hoy.getHours()<10)
      hora='0'+hora;
    if(hoy.getMinutes()<10)
      minutos='0'+minutos;
    if(hoy.getSeconds()<10)
      segundos='0'+segundos;
    //let date=dd+'-'+mm+'-'+yyyy+'T'+hora+':'+minutos+':'+segundos+'Z';
    let date=yyyy+'-'+mm+'-'+dd+'|'+hora+':'+minutos;

    return date;
  }
  dismiss(){
    if(this.pageanterior=='MisRutas'){
    this.navCtrl.setRoot(MisRutasPage,{id_usuario: this.id_usuario,id_auto:this.id_auto});}
    else{
      this.navCtrl.setRoot(AddrutaproPage,{id_usuario: this.id_usuario,id_auto:this.id_auto});
    }
  }
}
