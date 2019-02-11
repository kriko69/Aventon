import { HomePasajeroPage } from './../home-pasajero/home-pasajero';
import { MarkadorPage } from './../markador/markador';
import { rutaactiva } from './../../interfaces/rutactiva.service';
import { firebaseService } from './../../services/firebase.service';
import { Component, NgModule } from '@angular/core';
import { NavController, Platform, NavParams, AlertController,ModalController } from 'ionic-angular';

//IMPORTAR GEOLOCALIZACIÓN DE GOOGLE
import { Geolocation } from '@ionic-native/geolocation';
import{Ruta} from '../../interfaces/rutas.interface';
import { AddRutaPage } from '../add-ruta/add-ruta';
import { UbicacionService } from '../../providers/ubicacion/ubicacion';
import { ToastService } from '../../services/toast.service';
import { ISubscription } from 'rxjs/Subscription';
import { PuntoRecogidaPage } from '../punto-recogida/punto-recogida';
import { VerMiQrPage } from '../ver-mi-qr/ver-mi-qr';
import { PasajeroPage } from '../pasajero/pasajero';
declare var google: any;
/**
 * Generated class for the VerMiRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-ver-ruta-desde-pasajero',
  templateUrl: 'ver-ruta-desde-pasajero.html',
})
export class VerRutaDesdePasajeroPage {
  cargarmapa=true;
  bigboy=false;
  diferentes=[];
  latitud;
  longitud;
  suscrito1:ISubscription;
  suscrito2:ISubscription;
  parar=true;
  marka:any;
  capacidad;
  cadenaaaa='';
  email='';
  ruta='';
  map: any;
  ii;
  pasajeros='';
  markersArray=[];
  contador=0;
  markeraux:any;
  extra:any;
  otro:any;
  latUCB  = -16.523098;
longUCB = -68.112290;
laRutaActiva=[];
rutavieja='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toast:ToastService,public servicio:firebaseService,private platform:Platform,public alerta:AlertController) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
      this.latitud=this.navParams.get('latitud');
      this.longitud=this.navParams.get('longitud');
    this.email = this.navParams.get('email');
    this.otro = this.navParams.get('otro');
    this.capacidad = this.navParams.get('capacidad');
  this.ruta = this.navParams.get('ruta');console.log('email: '+this.email); //pasajero
  console.log('otro: '+this.otro); //conductor
  let conductor=this.otro.split('.');

  this.servicio.getRutaActiva(conductor[0]).valueChanges().subscribe(
    (data)=>{
      this.laRutaActiva=data;
      console.log(this.laRutaActiva);

    }
  );
  }

  ionViewDidLoad() {
   // this.loadMap(this.latUCB,this.longUCB);
   this.loadMap(this.latUCB,this.longUCB);
  }
  private loadMap(latOri, lngOri) {
    let rutaac;
    let caux:any;
    this.suscrito1=this.servicio.getActivas1().valueChanges().subscribe(
      data =>{
        for(caux of data)
        {
          console.log(data);
          if(caux.email==this.otro){
            this.diferentes.push(caux);
          }
        }
        console.log(this.diferentes);
        this.ii=this.diferentes.length-1;
    console.log(this.ii);
    if(this.rutavieja!=this.diferentes[this.ii].ruta){
      this.rutavieja=this.diferentes[this.ii].ruta;
    this.sesa();
    }
    else{

      let latemail=this.otro.split('.');
      this.marka.setMap(null);
      this.suscrito2=this.servicio.latlong(latemail[0]).valueChanges().subscribe(
      data =>{
       console.log(data[0]);
       this.marka.setMap(null);
       var ubicacion = {lat: Number(data[0]), lng: Number(data[1])};
       this.marka.setPosition(ubicacion);
       this.marka.setIcon('https://img.icons8.com/cotton/40/sedan.png');
       this.marka.setMap(this.map);
      }
    );
    setTimeout(() => {
      this.suscrito2.unsubscribe();
    }, 1000);
    }
      }
    );
  }

  sesa(){
    this.markersArray=[];

   if(this.diferentes[this.ii].pasajeros!='' && this.diferentes[this.ii].pasajeros!=null){
       this.pasajeros=this.diferentes[this.ii].pasajeros;}
   let latlon=this.diferentes[this.ii].ruta.split(';');
   let aux:any;
   console.log(latlon);
   let puntos=latlon.length;
   console.log(puntos);
    //RUTA ESTA EN this.diferentes[this.ii].ruta;
   for(let i=0;i<puntos;i++)
   {
     aux=latlon[i];
     let partida=aux.split('/');
     this.markeraux = new google.maps.Marker({position: {lat: Number(partida[0]), lng: Number(partida[1])},map: this.map,draggable: false});
     console.log(Number(partida[0])+'/'+Number(partida[1]));
     if(i!=0 && i!=puntos-1){
       if(this.diferentes[this.ii].recogidas!=null){
         let paradas=this.diferentes[this.ii].recogidas.split(';');
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
    this.map = new google.maps.Map(document.getElementById('maparuta'), {
     center: {lat: this.latUCB, lng: this.longUCB},
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
     }
   });
   for(let i=1;i<puntos-1;i++){
     this.markersArray[i].setMap(this.map);
   }
   let latemail=this.otro.split('.');
   this.marka = new google.maps.Marker({position: {lat: Number(0), lng: Number(0)},map: this.map,draggable: false});
   this.suscrito1=this.servicio.latlong(latemail[0]).valueChanges().subscribe(
   data =>{
     console.log(data[0]);
       this.marka.setMap(null);
       this.marka = new google.maps.Marker({position: {lat: Number(data[0]), lng: Number(data[1])},map: this.map,draggable: false});
       this.marka.setIcon('https://img.icons8.com/cotton/40/sedan.png');
       if(this.bigboy==false)
       this.marka.setMap(this.map);

   }
 );
 this.cargarmapa=false;
 console.log('latlon!',latlon);
 this.calcularTiempos(latlon);
}

  para(){
      console.log('ROMAAAAAAAA');
      let aux=this.diferentes[this.ii].ruta.split(';');
      let varia=this.latitud+'/'+this.longitud;
      var index = aux.indexOf(varia);
      if (index > -1) {
        aux.splice(index, 1);
      }
      let cadena='';
      for(let i=0;i<aux.length;i++){
        if(i!=aux.length-1)
        {
          cadena+=aux[i]+';';
        }
        else{
          cadena+=aux[i];
        }
      }
      this.diferentes[this.ii].ruta=cadena;
      this.diferentes[this.ii].capacidad=this.diferentes[this.ii].capacidad+1;
      console.log(this.email);

      aux=this.diferentes[this.ii].pasajeros.split(';');
      varia=this.email.split('.')[0];
      var index3 = aux.indexOf(varia);
      if (index3 > -1) {
        aux.splice(index3, 1);
      }
      cadena='';
      for(let i=0;i<aux.length;i++){
        if(i!=aux.length-1)
        {
          cadena+=aux[i]+';';
        }
        else{
          cadena+=aux[i];
        }
      }
      this.diferentes[this.ii].pasajeros=cadena;

      aux=this.diferentes[this.ii].recogidas.split(';');
      varia=this.latitud+'/'+this.longitud;
      var index2 = aux.indexOf(varia);
      if (index2 > -1) {
        aux.splice(index2, 1);
      }
      cadena='';
      for(let i=0;i<aux.length;i++){
        if(i!=aux.length-1)
        {
          cadena+=aux[i]+';';
        }
        else{
          cadena+=aux[i];
        }
      }
      this.diferentes[this.ii].recogidas=cadena;
      this.servicio.RutaActiva(this.diferentes[this.ii]);

      this.bigboy=true;
    this.suscrito1.unsubscribe();
        this.navCtrl.setRoot(PasajeroPage,{email: this.email,capacidad:this.capacidad});
  }
  fin(){
    this.navCtrl.setRoot(PasajeroPage,{email: this.email,capacidad:this.capacidad});
  }

  mostrarQR()
  {
    let micorreo=this.email.split('.');

    this.navCtrl.push(VerMiQrPage,{email:micorreo[0],fechaHora:this.laRutaActiva[8]});
  }
  //NUEVOO
  presentPrompt() {
    let alert = this.alerta.create({
      title: 'Reportar transito',
      inputs: [
        {
          name: 'calle',
          placeholder: 'Calle',
          type: 'text'
        },
        {
          name: 'problema',
          placeholder: 'Problematica',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: data => {
            let data1={
              reporte:data.problema,
              persona:this.email,
              fecha:this.dameFecha(),
              calle:data.calle
            };
            setTimeout(() => {
            this.servicio.reporte(data1);
            this.mostrarAlerta();
            }, 500);
          }
        },
      {
        text: 'CANCELAR'
      }]
    });
    alert.present();

    console.log(alert);
  }
  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'Reporte Guardado con exito.',
      buttons: ['OK']
    });
    alert.present();
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
      let date=yyyy+'-'+mm+'-'+dd+'|'+hora+':'+minutos;
    //let date=dd+'-'+mm+'-'+yyyy+'|'+hora+':'+minutos+':'+segundos;
    return date;
  }


  calcularTiempos(latlon)
  {
    console.log('DIFERENTES',this.diferentes);
    console.log('MARKERSARRAY: ',this.markersArray);


    let fecha=this.diferentes[this.ii].zfecha.split('|');
    let horaViaje=fecha[1];
    console.log('horaViaje',horaViaje);

    let pasajeros=this.diferentes[this.ii].pasajeros.split(';');
    let recogidas=this.diferentes[this.ii].recogidas.split(';');
    /*let puntosPasajero=new Array(pasajeros.length-1);
    for (let i = 0; i < pasajeros.length-1; i++) {
      puntosPasajero[i]=new Array(2);

    }
    for (let i = 0; i < pasajeros.length; i++) {
      if(pasajeros[i]!='' && recogidas[i]!='')
      {
        puntosPasajero[i][0]=pasajeros[i];
        puntosPasajero[i][1]=recogidas[i];
      }
    }
    console.log('RECOGIDAS',puntosPasajero);
    //console.log('pasajero: ',puntosPasajero[0][0]);
    //console.log('punto: ',puntosPasajero[0][1]);*/

    let split;
    let point;
    let puntos=[];
    let waypts=[];
    let wayptsSinRecogidas=[];
    for (let i = 0; i < latlon.length; i++) {
      split=latlon[i].split('/');
      point=new google.maps.LatLng(split[0],split[1]);
      puntos.push(point);
    }
    console.log(puntos);

    //obtener los intermedios
    for (let i = 0; i < puntos.length; i++) {
      if(i!=0 && i!=puntos.length-1)
      {
        waypts.push({
          location:puntos[i],
          stopover:true
        });
      }

    }
    console.log(waypts);

    let tiempos=[];
    let tiemposLiteral=[];

    tiemposLiteral.push(this.determinarPartida(horaViaje)); //hora de partida
    var directionsService=new google.maps.DirectionsService;
    var directionsDisplay= new google.maps.DirectionsRenderer({
      draggable:true,
      map:null
    });
    var request = {
      origin: puntos[0],
      destination: puntos[puntos.length-1],
      travelMode: 'DRIVING',
      waypoints:waypts
    };

    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
        console.log('RUTAS: ',directionsDisplay.getDirections());
        let limite=directionsDisplay.getDirections().routes[0].legs.length;
        let aux=0;
        let minutos;
        for (let i = 0; i < limite; i++) {
          let split=directionsDisplay.getDirections().routes[0].legs[i].duration.text.split(' ');
          minutos=Number(split[0]);
          aux=aux+minutos;
          tiempos.push(aux)

        }
        console.log('TIEMPOS: ',tiempos);

        for (let i = 0; i < tiempos.length; i++) {
          let split=horaViaje.split(':')
          let h=Number(split[0]);
          let m=Number(split[1]);
          let segundos1=m*60;
          let segundos2=h*3600;
          let segundos3=tiempos[i]*60;
          let suma=segundos1+segundos2+segundos3;
          let min=Math.floor(suma/3600);
          suma=suma-(3600*min);
          let seg=suma/60;
          if(seg<10)
          {
            if(min>11 && min<=23){
              tiemposLiteral.push(min+':0'+seg+' pm');
            }else{
              tiemposLiteral.push(min+':0'+seg+' am');
            }
          }else{
            if(min>11 && min<=23){
              tiemposLiteral.push(min+':'+seg+' pm');
            }else{
              tiemposLiteral.push(min+':'+seg+' am');
            }
          }
        }

        console.log('TIEMPOS LITERAL: ',tiemposLiteral);



      }else {
        window.alert('Directions request failed due to ' + status);
      }
    });

    console.log('TIEMPOS LITERAL X2: ',tiemposLiteral);
    setTimeout(()=>{
      this.ponerTiemposMarker(tiemposLiteral);
    },1000);

  }


  ponerTiemposMarker(tiemposLiteral)
  {
    console.log('TIEMPOS LITERAL X69: ',tiemposLiteral);
    console.log('MARKERSARRAY X2: ',this.markersArray);

    let markers=this.markersArray;
    let mapita=this.map;
    console.log(mapita);
    console.log(markers);

    markers=this.ordenar(markers);

    for (let i = 0; i < markers.length; i++) {
      console.log('marker '+(i+1)+': '+markers[i].getPosition());
    }

    let infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < markers.length; i++)
     {
      google.maps.event.addListener(markers[i], 'click', (function (marker, i)
      {
        return function ()
        {
            infowindow.setContent(tiemposLiteral[i]);
            infowindow.open(mapita,markers[i]);
        }
      })(markers[i], i));
    }
    let info='';
    info+='<b>Hora de partida: </b>'+tiemposLiteral[0]+'<br>';
    info+='<b>Hora de llegada a la UCB: </b>'+tiemposLiteral[tiemposLiteral.length-1]+'<br>';
    document.getElementById('horario').innerHTML=info;
  }


  determinarPartida(horaViaje)
  {
    let split=horaViaje.split(':');
    if(Number(split[0])>11 && Number(split[0])<=23)
      return horaViaje+' pm';
    else
      return horaViaje+' am';
  }

  ordenar(markers)
  {
    let lats=[];
    let ordenados=[];
    for (let i = 0; i < markers.length; i++) {
      lats.push(markers[i].getPosition().lat());
    }
    console.log('lats: ',lats);
    lats=lats.sort();

    for (let i = 0; i < lats.length; i++) {
      for (let e = 0; e < markers.length; e++) {
        if(markers[e].getPosition().lat()==lats[i])
          ordenados.push(markers[e]);
      }
    }

    for (let i = 0; i < ordenados.length; i++) {
      console.log('ordenado '+(i+1)+': '+ordenados[i].getPosition());

    }
    return ordenados;

  }
}
