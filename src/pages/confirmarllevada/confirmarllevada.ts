import { VerRutaDesdePasajeroPage } from './../ver-ruta-desde-pasajero/ver-ruta-desde-pasajero';
import { ReservaPasajeroPage } from './../reserva-pasajero/reserva-pasajero';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, Platform } from 'ionic-angular';

/**
 * Generated class for the ReservarProgramadasPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { firebaseService } from '../../services/firebase.service';
import { PasajeroPage } from '../pasajero/pasajero';
import { PuntoRecogidaPage } from '../punto-recogida/punto-recogida';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-confirmarllevada',
  templateUrl: 'confirmarllevada.html',
})
export class ConfirmarllevadaPage {
  markersArray = [];
  markeraux:any;
  latOri  = -16.503720; 
  longOri = -68.131247;
  map: any;
  email;
  data:any;
  rama;
  parser;
  latitud;
  longitud;
  solicitud={
    de: '',
    nombre:'',
    mensaje: "Me puedes recoger?",
    estado:'no aceptado',
    fechaViaje:'',
    horaViaje:''
  }; //la solicitud que le llega a el
  misolicitud={
    a: '',
    estado:'no aceptado',
    fechaViaje:'',
    horaViaje:''
  }; //la solicitud que yo mande
  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public alerta:AlertController,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.latitud=this.navParams.get('latitud');
    this.longitud=this.navParams.get('longitud');
    this.email=this.navParams.get('email');
    this.data=this.navParams.get('data');
    console.log(this.data);
    
    this.rama=this.data.email.split('.');
    this.parser=this.email.split('.');
    this.solicitud.de=this.parser[0];
    this.misolicitud.a=this.rama[0];

    this.solicitud.fechaViaje=this.data.fecha;
    this.solicitud.horaViaje=this.data.hora;
    this.misolicitud.fechaViaje=this.data.fecha;
    this.misolicitud.horaViaje=this.data.hora;

    this.servicio.obtenerNombreParaSolicitud(this.parser[0]).valueChanges().subscribe(
      datas=>{
        console.log(datas);
        this.solicitud.nombre=''+datas[10];
      }
    );
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservarProgramadasPasajeroPage');
    this.recargar();
  }
  
  enviar()
  {
      this.distancia(this.data);
      var nav = this.app.getRootNav();
      this.enviarSolicitudes();
      nav.setRoot(VerRutaDesdePasajeroPage,{email:this.email,otro:this.data.email,latitud:this.latitud,longitud:this.longitud});

  }

  enviarAlMio()
  {
    this.servicio.definirMiSolicitudRef(this.rama[0],this.parser[0],this.data.fecha,this.data.hora);
    this.servicio.addMiSolicitud(this.misolicitud);
  }

  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'Solicitud Enviada!',
      subTitle: 'Espera a la respuesta en tu buzon',
      buttons: ['OK']
    });
    alert.present();
  }
  recargar(){
    let points=this.data.ruta;
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
        if(this.data.recogidas!=null){
          let paradas=this.data.recogidas.split(';');
          let bol=false;
          for(let i=0;i<paradas.length;i++)
          {
            if(paradas[i]==aux)
            {
              this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/micons/blue-dot.png');
              bol=true;
            }
          }
          if(bol==false)
          {
            this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
          }
  
        }
        else{
          this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        }
      }
      this.markersArray.push(this.markeraux);
    }
    var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
     directionsDisplay = new google.maps.DirectionsRenderer();
     this.map = new google.maps.Map(document.getElementById('mapconf'), {
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
   
    let markad = new google.maps.Marker({position: {lat: Number(this.latitud), lng: Number(this.longitud)},map: this.map,draggable: false}); 
    markad.setIcon('http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png');
    markad.setMap(this.map);
    console.log('yeeii'+this.latitud+'//'+this.longitud);
    
  }
  dismiss()
  {
    this.navCtrl.setRoot(PuntoRecogidaPage,{email: this.email});
  }
  distancia(data){
    let latlong;
    let lat;let long;
    let distancia;
    let puntos=data.ruta.split(';');
    let dismin=10000;let latlongmin=puntos[0];
    for(let i=0;i<puntos.length;i++){
        latlong=puntos[i].split('/');
        lat=Number(latlong[0]);
        long=Number(latlong[1]);
        distancia=this.getKilometros(this.latitud,this.longitud,lat,long);
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
        cadena=cadena+';'+this.latitud+'/'+this.longitud;
      }
      if(i+1!=puntos.length){
        cadena=cadena+';';
      }
      }
      data.ruta=cadena;
      if(data.recogidas==null){
        data.recogidas=this.latitud+'/'+this.longitud;
      }
      else{
        data.recogidas=data.recogidas+';'+this.latitud+'/'+this.longitud;
      }
      //servicio
      /*if(data.pasajeros==null){
        data.pasajeros=this.email;
      }
      else{*/
        let emailsinpunto=this.email.split('.');
        data.pasajeros=data.pasajeros+';'+emailsinpunto[0];
     // }
      data.capacidad=data.capacidad-1;
      this.servicio.updateAct(data);
      console.log(cadena);
    console.log(data.ruta);
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
  enviarSolicitudes()
  {
    let conductor=this.data.email.split('.');
    let fechahora=this.data.zfecha.split('|');
    let integrantes=this.email.split('.');
        this.servicio.enviarSolicitudesActiva(conductor[0],integrantes[0],fechahora[0],fechahora[1]);
  }
}
