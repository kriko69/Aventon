import { VerMiRutaPage } from './../ver-mi-ruta/ver-mi-ruta';
import { rutaactiva } from './../../interfaces/rutactiva.service';
import { firebaseService } from './../../services/firebase.service';
import { Component, NgModule } from '@angular/core';
import { NavController, Platform, NavParams, AlertController,ModalController, App } from 'ionic-angular';

//IMPORTAR GEOLOCALIZACIÓN DE GOOGLE
import { Geolocation } from '@ionic-native/geolocation';
import{Ruta} from '../../interfaces/rutas.interface';
import { AddRutaPage } from '../add-ruta/add-ruta';

declare var google: any;

@Component({
  selector: 'page-markador',
  templateUrl: 'markador.html'
})

export class MarkadorPage {
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
  constructor(public app:App,public navCtrl: NavController, public alerta:AlertController,public geolocation: Geolocation, public platform:Platform,
    public navParams:NavParams,public servicio:firebaseService,public modalCtrl:ModalController) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.email = this.navParams.get('email');
    this.capacidad = this.navParams.get('capacidad');
    this.placa=navParams.get('placa');
    console.log(this.email+'/'+this.capacidad+'/'+this.placa);

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
    this.presentPrompt();
  }
  //funcion para mostrar alerta de confirmacion pasando un string
   mostrarAlerta(aux:string) {
    const alert = this.alerta.create({
      title: 'Exito',
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
        },
        {
          name: 'precio',
          placeholder: 'Precio',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: data => {
              console.log(data.nombre);
              if(data.nombre!='' && data.nombre!=null)
              this.ruta.nombre=data.nombre;
              if(data.precio!=0)
              this.ruta.precio=Number(data.precio);
              //this.email='roma@ucb.com';
     let cadena='';
     for(let i=0;i<this.contador;i++){
      cadena=cadena+this.markersArray[i].getPosition().lat()+"/"+this.markersArray[i].getPosition().lng();
      if(i!=this.contador-1)
        cadena=cadena+';';
      }
     this.ruta.puntos=cadena;
     this.ruta.placa=this.placa;
     this.ruta.correousuario=this.email;
    let aux=this.email.split('.');
    this.servicio.definirRutaRef(aux[0],this.ruta.nombre);
    this.servicio.addRuta(this.ruta);
    let text='Ruta guardada con exito!';
    this.mostrarAlerta(text); //alerta
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
    let modal=this.modalCtrl.create(AddRutaPage,{datos:this.email});
    modal.present();
    console.log(this.email);
    modal.onDidDismiss(data=>{
      if(data){
        this.recargar(data);
      }
    });
  }
  recargar(points:any){
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
    let arrayaux=[];
    for(let i=0;i<puntos;i++)
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
    let text='Ruta generada con exito!';
    this.mostrarAlerta(text); //alerta
    for(let i=0;i<puntos;i++)
    {
      this.markersArray[i]=arrayaux[i];
    }
    this.contador=puntos;
    this.isenabled=false;
    this.isenabled1=true;
    this.isenabled2=false;
    this.isenabled3=true;
  }
  //guarda la ruta en RutaActuva
  activarRuta(){
    console.log(this.monto);
    let zfecha=this.dameFecha();
    let varia:rutaactiva={
      email:'',
      ruta:'',
      precio:this.monto,
      capacidad:this.capacidad,
      zfecha: zfecha,
      pasajeros:'',
      recogidas:''
    };
    let cadena='';
     for(let i=0;i<this.contador;i++){
      cadena=cadena+this.markersArray[i].getPosition().lat()+"/"+this.markersArray[i].getPosition().lng();
      if(i!=this.contador-1)
        cadena=cadena+';';
      }
    varia.ruta=cadena;
    varia.email=this.email;
    let vava={
      ruta:'',
      capacidad:this.capacidad,
      email:'',
      precio:this.monto,
      zfecha: zfecha,
      pasajeros:'',
      recogidas:'',
      alat:'',
      along:''
    }
    vava.email=varia.email;
    vava.ruta=varia.ruta;
    vava.capacidad=varia.capacidad;
    this.servicio.RutaActiva(vava);
    var nav = this.app.getRootNav();
    nav.setRoot(VerMiRutaPage,{email: this.email,capacidad:this.capacidad});
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
  presentPrompt3() {
    let alert = this.alerta.create({
      title: 'Precio',
      inputs: [
        {
          name: 'paga',
          type: 'checkbox',
          label: 'Deseo que me paguen.',
          value: 'true'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if(data[0]){
              this.presentPrompt2();
            }
            else{
              this.monto=0;
              this.activarRuta();

            }
          }
        },
      {
        text: 'CANCELAR'
      }]
    });
    alert.present();

    console.log(alert);
  }
  presentPrompt2() {
    let alert = this.alerta.create({
      title: 'Precio',
      inputs: [
        {
          name: 'precio',
          placeholder: 'Precio',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: data => {
              if(data.precio!=0)
              this.monto=Number(data.precio);
              
              this.activarRuta();
          }
        },
      {
        text: 'CANCELAR'
      }]
    });
    alert.present();

    console.log(alert);
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
}
