import { OpcionesConductorPage } from './../opciones-conductor/opciones-conductor';
import { MarkadorPage } from './../markador/markador';
import { rutaactiva } from './../../interfaces/rutactiva.service';
import { firebaseService } from './../../services/firebase.service';
import { Component, NgModule } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, ModalController, App } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//IMPORTAR GEOLOCALIZACIÓN DE GOOGLE
import { Geolocation } from '@ionic-native/geolocation';
import{Ruta} from '../../interfaces/rutas.interface';
import { AddRutaPage } from '../add-ruta/add-ruta';
import { UbicacionService } from '../../providers/ubicacion/ubicacion';
import { ToastService } from '../../services/toast.service';
import { ISubscription } from 'rxjs/Subscription';
import { ConductorPage } from '../conductor/conductor';
import { IfStmt } from '@angular/compiler';
import { EsPasajeroPage } from '../es-pasajero/es-pasajero';
declare var google: any;
/**
 * Generated class for the VerMiRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-ver-mi-ruta',
  templateUrl: 'ver-mi-ruta.html',
})
export class VerMiRutaPage {
   ii;
  bigboy=false;
  diferentes=[];
   auxdif=[];
  suscrito1:ISubscription;
  suscrito2:ISubscription;
  suscrito3:ISubscription;
  parar=true;
  marka:any;
  capacidad;
  cadenaaaa='';
  email='';
  ruta='';
  map: any;
  markersArray=[];
  contador=0;
  markeraux:any;
  extra:any;
  latUCB  = -16.523098;
  pasajeros='';
  btnpasa=[];
longUCB = -68.112290;
laRutaActiva=[];
rutavieja='';
inicio=true;
validar=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toast:ToastService,private _ubicacion:UbicacionService,public servicio:firebaseService,public app:App,
    public bs:BarcodeScanner,private alert:AlertController,private platform:Platform,public alerta:AlertController,public alerta1:AlertController) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.email = this.navParams.get('email');
    console.log('CORRREEEEEEROOOOO: '+this.email);

    this.capacidad = this.navParams.get('capacidad');
  this.ruta = this.navParams.get('ruta');
  let flag=false;
  this._ubicacion.iniciar_localizacion(this.email);
  let conductor = this.email.split(".");

  this.servicio.getRutaActiva(conductor[0]).valueChanges().subscribe(
    data => {
      this.laRutaActiva = data;
      console.log(this.laRutaActiva);
    });
  }

  ionViewDidLoad() {
   // this.loadMap(this.latUCB,this.longUCB);
   try{
   this.loadMap(this.latUCB,this.longUCB);}
   catch(err){}
  }
  private loadMap(latOri, lngOri) {
    let rutaac;
    let caux:any;
    this.suscrito1=this.servicio.getActivas1().valueChanges().subscribe(
      data =>{
        for(caux of data)
        {
          console.log(data);
          if(caux.email==this.email){
            this.diferentes.push(caux);
          }
        }
        console.log(this.diferentes);
        this.ii=this.diferentes.length-1;
          this.btnpasa=[];
        if(this.diferentes[this.ii].pasajeros!='' && this.diferentes[this.ii].pasajeros!=null)
        {
         let btnpasa=this.diferentes[this.ii].pasajeros.split(';');
         for(let i=0;i<btnpasa.length;i++){
            if(btnpasa[i]!='' && btnpasa[i]!=' ' && btnpasa[i]!=null)
            {
              this.btnpasa.push(btnpasa[i]);
            }
         }
        }
    console.log(this.ii);
    if(this.rutavieja!=this.diferentes[this.ii].ruta){
      this.rutavieja=this.diferentes[this.ii].ruta;
    this.sesa();
    }
    else{

      let latemail=this.email.split('.');
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
    if(this.inicio && this.diferentes[this.ii].pasajeros!=''){
      this.mostrarAlerta2();
    }
      }
    );
    this.auxdif=this.diferentes;
  }
  sesa(){
    this.markersArray=[];
   this.pasajeros='';
   if(this.diferentes[this.ii].pasajeros!='' && this.diferentes[this.ii].pasajeros!=null){
       this.pasajeros=this.diferentes[this.ii].pasajeros;}
   let latlon=this.diferentes[this.ii].ruta.split(';');
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
    this.map = new google.maps.Map(document.getElementById('mapas'), {
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
   let latemail=this.email.split('.');
   this.marka = new google.maps.Marker({position: {lat: Number(0), lng: Number(0)},map: this.map,draggable: false});
   this.suscrito1=this.servicio.latlong(latemail[0]).valueChanges().subscribe(
   data =>{
     console.log(data[0]);
       this.marka.setMap(null);
       this.marka = new google.maps.Marker({position: {lat: Number(data[0]), lng: Number(data[1])},map: this.map,draggable: false});
       //this.marka.setIcon('http://maps.google.com/mapfiles/ms/micons/cabs.png');
       this.marka.setIcon('https://img.icons8.com/cotton/40/sedan.png');
       if(this.bigboy==false)
       this.marka.setMap(this.map);

   }
 );
 console.log('latlon!',latlon);
 this.calcularTiempos(latlon);
}
  para(){
    this._ubicacion.cortar_localizacion();
      this.bigboy=true;
      let y=this.pasajeros.split(';');
      //nuevo
      for(let i=0;i<y.length;i++)
      {
        if(y[i]!='')
        {
          this.aumentarcontadores(y[i]);
          this.eliminaractivas(y[i]);
        }
      }
      this.aumentarcontadorescond();
      //nuevo

      console.log(y);

      this.calificar(this.pasajeros);
    this.diferentes=this.auxdif;
    this.suscrito1.unsubscribe();
    let aux=this.email.split('.');
    var nav = this.app.getRootNav();
    nav.setRoot(ConductorPage,{email: this.email,capacidad:this.capacidad});
  }
  calificar(correos:string){
    let mensaje1={
    fecha:this.dameFecha(),
    estado:'No Calificado',
    mensaje:'CALIFICAME!!!',
    emails:correos
  }
  let co=this.email.split('.');
  console.log('fkyghujik'+correos);
  if(mensaje1.emails!=''){
  this.servicio.calificarpasa(co[0],mensaje1);

    let aux=correos.split(';');
    for(let i=0;i<aux.length;i++){
      let auxi=aux[i].split('.');
      let mensaje={
        de:this.email,
        fecha:this.dameFecha(),
        estado:'No Calificado',
        mensaje:'CALIFICAME!!!'
      }
      console.log('915613489   '+auxi[0]);

      this.servicio.calificarcond(auxi[0],mensaje);

    }
  }
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

  scan(correo:string)
  {
    let correo1=correo.split('.');
    this.bs.scan().then(barcodeData => {
      let data = barcodeData.text.split('|');
      if(correo1[0]==data[0] && (this.verificarFechaHora(data[1]+'|'+data[2])) )
      {
        console.log('pertenece');
        this.navCtrl.setRoot(EsPasajeroPage,{email:this.email,correo:correo,capacidad:this.capacidad,ruta:this.ruta});
      }
      else
      {
        this.NoEsPasajeroAlert();
      }

     }).catch(err => {
         console.log('Error', err);
     });
  }
  verificarFechaHora(fecha:string)
  {
    if(this.laRutaActiva[8]==fecha)
    {
      return true;
    }else{
      return false;
    }

  }

  NoEsPasajeroAlert() {
    const alert = this.alert.create({
      title: 'No es pasajero!',
      subTitle: 'Este pasajero no esta registrado en tu ruta. Cuidado!',
      buttons: ['OK']
    });
    alert.present();
  }
  //nuevo
  aumentarcontadores(pasajeros){
    let pasajero=pasajeros.split('.');
    let totalpasa=0;
    let info=[];
    this.suscrito2=this.servicio.obtenerInfo(pasajero[0]).valueChanges().subscribe(
      (data)=>{
        info=data;
        totalpasa=info[13]+1;
        console.log(totalpasa);
      }
    );
    setTimeout(() => {
      this.suscrito2.unsubscribe();
      console.log(totalpasa);
      this.servicio.actpasa(pasajero[0],totalpasa);
    }, 1000);
  }
  aumentarcontadorescond()
  {
    let cond=this.email.split('.');
    let totalcond=0;
    let info=[];
    this.suscrito2=this.servicio.obtenerInfo(cond[0]).valueChanges().subscribe(
      (data)=>{
        info=data;
        totalcond=info[12]+1;
      }
    );
    setTimeout(() => {
      this.suscrito2.unsubscribe();
      this.servicio.actcond(cond[0],totalcond);
    }, 1000);
  }
  //nuevo
  eliminaractivas(pasajeros){
    let cond=this.email.split('.');
    let pasajero=pasajeros.split('.');
    this.servicio.eliminarSolicitudesActiva(cond[0],pasajero[0]);
  }
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
  mostrarAlerta2(){
    let pasajeros=this.diferentes[this.ii].pasajeros.split(';');
    let info=[];
    let cadena='';
    for(let i=0;i<pasajeros.length;i++){
      let aux=pasajeros[i].split('.');
      this.validar.push(aux[0]);
      this.suscrito3=this.servicio.obtenerInfo(aux[0]).valueChanges().subscribe(
        (data)=>{
          if(data[9]!=undefined && data[0]!=undefined && data[16]!=undefined && data[17]!=undefined && data[15]!=undefined && data[14]!=undefined)
          {
          let obj={
            nombre:data[9]+' '+data[0],
            gorra:' Gorra: '+data[16],
            sup:' Prenda Superior: '+data[17],
            inf:' Prenda Inferior: '+data[15],
            acc:' Accesorio: '+data[14]
          };
          info.push(obj);
        }
        }
      );
      setTimeout(() => {
        this.suscrito3.unsubscribe();
        cadena='No olvides recoger a: <br>';
    for(let i=0;i<info.length;i++)
    {
      cadena=cadena+info[i].nombre+'<br>';
      cadena=cadena+info[i].gorra+'<br>';
      cadena=cadena+info[i].sup+'<br>';
      cadena=cadena+info[i].inf+'<br>';
      cadena=cadena+info[i].acc+'<br>';
    }

    console.log('INFO',info);
    const alert1 = this.alerta1.create({
      title: 'Pasajeros.',
      message:cadena,
      buttons: ['OK']
    });
    if(this.inicio){
    alert1.present();
    this.inicio=false;}
      }, 500);
    }
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
