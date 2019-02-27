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
import { mysqlService } from '../../services/mysql.service';
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
  latOri=-16.503720;
  longOri=-68.131247;
   ii;
  pararciclo=true;
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

id_usuario;
id_auto;
ruta_activada;
integrantes=[];
puntos_ruta;
puntos_recogida;
puntosordenados;
markerauto= new google.maps.Marker();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toast:ToastService,private _ubicacion:UbicacionService,public servicio:firebaseService,public app:App,
    public bs:BarcodeScanner,private alert:AlertController,private platform:Platform,public alerta:AlertController,public alerta1:AlertController,
    public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.id_usuario = this.navParams.get('id_usuario')
    this.id_auto = this.navParams.get('id_auto');
    this.ruta_activada = this.navParams.get('ruta_activada');
  let flag=false;
    //obtengo mi poscion actual+
  this._ubicacion.iniciar_localizacion(this.ruta_activada.id_viaje);
    this.obtnintegrantes();
    //
  }

  ionViewDidLoad() {
   try{
  // this.loadMap(this.latUCB,this.longUCB);
}
   catch(err){}
  }
  obtnintegrantes()
  {
    let integrantesaux;
    this.mysql.listarIntegrantesPorRuta(this.ruta_activada.id_viaje).subscribe(
    data=>{
      console.log('integrantes',data);
      integrantesaux=data;

    },(error)=>{
      console.log(error);

    }
  );
  setTimeout(()=>{
    console.log("INTEGRANTES",integrantesaux);
if(integrantesaux==undefined){
  this.integrantes=[];
}
    else if(integrantesaux['message'].localeCompare("No se encontro integrantes")==0 ){
    this.integrantes=[];
  }
  else{
    this.integrantes=integrantesaux;
  }
    this.obtnpuntos1();
  },1000);}
  obtnpuntos1()//obtener los puntos de la ruta original
  {
    this.mysql.obtener_Puntos(this.ruta_activada.id_viaje).subscribe(
    data=>{
      console.log('puntos_ruta',data);
      this.puntos_ruta=data;

    },(error)=>{
      console.log(error);

    }
  );
  setTimeout(()=>{
    console.log("puntos_ruta",this.puntos_ruta);
    this.obtnpuntosrecogida();
  },1000);}
  obtnpuntosrecogida()
  {
    this.mysql.obtener_Puntos_Recogida(this.ruta_activada.id_viaje).subscribe(
    data=>{
      console.log('puntos_recogida',data);
      this.puntos_recogida=data;

    },(error)=>{
      console.log(error);

    }
  );
  setTimeout(()=>{
    console.log("puntos_recogida",this.puntos_recogida);
    if(this.puntos_recogida['message'].localeCompare("ERROR")!=0 && this.puntos_recogida!=undefined){
    this.distancia(this.puntos_ruta,this.puntos_recogida);
  }
  else{
    this.recargar(this.puntos_ruta);
  }
  },1000);}
  sesa(){
    let ubicacion;
    this.mysql.Get_Ubicacion(Number(this.ruta_activada.id_viaje)).subscribe(
      data=>{
        console.log('Ubicacion Actual',data);
        ubicacion=data;
  
      },(error)=>{
        console.log(error);});
        setTimeout(() => {
          if(ubicacion!=undefined){
            this.markerauto.setMap(null);
          this.markerauto= new google.maps.Marker({position: {lat: Number(ubicacion[0].latitud), lng: Number(ubicacion[0].longitud)},map: this.map,draggable: false});}
          else{
            this.markerauto.setMap(null);
            this.markerauto= new google.maps.Marker({position: {lat: 0, lng: 0},map: this.map,draggable: false}); 
          }
          this.markerauto.setIcon('https://img.icons8.com/cotton/40/sedan.png');
          this.markerauto.setMap(this.map);
          setTimeout(() => {
            if(this.pararciclo){
            this.sesa();}
          }, 3000);
        }, 1000);

      }
  para(){
    this._ubicacion.cortar_localizacion();
    this.pararciclo=false;
      this.mysql.terminarRuta(Number(this.ruta_activada.id_viaje)).subscribe(
        data=>{
          console.log('terminarRuta',data);
        },(error)=>{
          console.log(error);
        }
        );
      //nuevo
      if(this.integrantes!=[] && this.integrantes!=undefined)
      {
      for(let i=0;i<this.integrantes.length;i++)
      {
        
          this.eliminaractivas(this.integrantes[i].ci,this.ruta_activada.id_viaje);
        
      }
      this.calificar();
    }
    var nav = this.app.getRootNav();
    nav.setRoot(ConductorPage,{id_usuario: this.id_usuario,id_auto:this.id_auto});
  }
  calificar(){
    let solicitud={
     id_de:0,
     id_para:Number(this.id_usuario),
     fecha:this.dameFecha(),
     estado:'No Calificado P',
     mensaje:'CALIFICAME!!!',
     id_viaje:Number(this.ruta_activada.id_viaje),
     latitud:0,
     longitud:0,
     sombrero:'',
      superior:'',
     inferior:'',
     accesorio:'',
    posicion:0
  };
    for (let i = 0; i < this.integrantes.length; i++) {
      solicitud.id_de=Number(this.integrantes[i].ci);   
      console.log("SOLICITUD P",solicitud);
       this.mysql.insertarSolicitud(solicitud).subscribe(
        data=>{
          console.log('insertarsol',data);
        },(error)=>{
          console.log(error);
        }
        );
    }
    for (let i = 0; i < this.integrantes.length; i++) { 
      console.log("SOLICITUD C",solicitud);
      solicitud.id_de=Number(this.integrantes[i].ci);
      solicitud.estado='No Calificado C';               //    de          para                  fecha                         id_viaje
      this.mysql.insertarSolicitud(solicitud).subscribe(
        data=>{
          console.log('insertarsol',data);
        },(error)=>{
          console.log(error);
        }
        );
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
      let date=yyyy+'-'+mm+'-'+dd+' '+hora+':'+minutos+':'+segundos;
    return date;
  }

  scan(integrante)
  {

    this.bs.scan().then(barcodeData => {
      let data = barcodeData.text.split('|');  //ci|fecha_hora|id_viaje
      if(integrante.ci==data[0] && this.ruta_activada.fecha_hora==data[1] && integrante.id_viaje==data[2])
      {
        console.log('pertenece');
        this.navCtrl.setRoot(EsPasajeroPage,{integrante:integrante,id_usuario:this.id_usuario,id_auto:this.id_auto,ruta_activada:this.ruta_activada});
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
  eliminaractivas(ci,id_viaje){
    let fecha=this.dameFecha();
    this.mysql.enviarSolicitudDeActivada(this.id_usuario,ci,fecha,'Expirada','La ruta ya esta expirada',this.ruta_activada.id_viaje).subscribe(
      data=>{
        console.log('CambiarActiva',data);
      },(error)=>{
        console.log(error);
      }
      );
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
              problema:data.problema,
              ci:Number(this.id_usuario),
              fecha:this.dameFecha(), //fecha del sistema
              calle:data.calle,
              id_viaje:Number(this.ruta_activada.id_viaje)
            };
            setTimeout(() => {
            this.mysql.registrarReporte(data1).subscribe(
              data=>{
                console.log('Reporte',data);
              },(error)=>{
                console.log(error);
              }
              );
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
    let pasajeros=this.integrantes;
    let vestimenta;
    let info2;
    let cadena='';
    for(let i=0;i<pasajeros.length;i++){
      this.mysql.obtenerVestimenta(this.integrantes[i].id_viaje,this.integrantes[i].ci).subscribe(
        data=>{
          console.log('Vestimenta',data);
         vestimenta=data;
    
        },(error)=>{
          console.log(error);
    
        }
      );
      }
      for(let i=0;i<vestimenta.length;i++){
      let obj={
        nombre:pasajeros[i].nombre+' '+pasajeros[i].apellido,
        gorra:' Gorra: '+vestimenta[i].sombrero,
        sup:' Prenda Superior: '+vestimenta[i].superior,
        inf:' Prenda Inferior: '+vestimenta[i].inferior,
        acc:' Accesorio: '+vestimenta[i].accesorio
      };
      info2.push(obj);
    }
    cadena='No olvides recoger a: <br>';
    for(let i=0;i<info2.length;i++)
    {
      cadena=cadena+info2[i].nombre+'<br>';
      cadena=cadena+info2[i].gorra+'<br>';
      cadena=cadena+info2[i].sup+'<br>';
      cadena=cadena+info2[i].inf+'<br>';
      cadena=cadena+info2[i].acc+'<br>';
    }

    console.log('INFO2',info2);
    const alert1 = this.alerta1.create({
      title: 'Pasajeros.',
      message:cadena,
      buttons: ['OK']
    });
    if(this.inicio){
    alert1.present();
    this.inicio=false;}
  }


  calcularTiempos(puntitos)
  {
    console.log('MARKERSARRAY: ',this.markersArray);
    let fecha=this.ruta_activada.fecha_hora.split(' ');
    let auxfecha=fecha[1].split(':');
    let horaViaje=auxfecha[0]+':'+auxfecha[1];
    console.log('horaViaje',horaViaje);
    let split;
    let point;
    let puntos=[];
    let waypts=[];
    let wayptsSinRecogidas=[];
    for (let i = 0; i < puntitos.length; i++) {
      point=new google.maps.LatLng(Number(puntitos[i].latitud),Number(puntitos[i].longitud));
      puntos.push(point);
    }
    //tengo los puntos en formato google.maps.LatLng
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

    //este es el tiempo de partida
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
      //ordeno por posicion los puntos
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



  distancia(puntos1,puntosrecogida){
    let puntos=puntos1;
    let posicion1=2;
    let posicion2=2;
    let auxposicion=2;
    let lat;
    let long;
    let aux1;
    let aux2;
    console.log('PUNTOS!!',puntos);
    
    let distancia=100000;
    for(let k=0;k<puntosrecogida.length;k++){
      for(let i=0;i<puntos.length-1;i++){
        lat=puntos[i].latitud;
        long=puntos[i].longitud;
        posicion1=Number(puntos[i].posicion);
        posicion2=Number(puntos[i+1].posicion);
        aux1=this.getKilometros(puntosrecogida[k].latitud,puntosrecogida[k].longitud,lat,long);
        aux2=this.getKilometros(puntosrecogida[k].latitud,puntosrecogida[k].longitud,puntos[i+1].latitud,puntos[i+1].longitud);
        if(aux1<=distancia && aux2>aux1){
          distancia=aux1;
          auxposicion=posicion1+1;
          console.log("AQUII:",distancia,i,auxposicion);
        }else{
          if(aux2<=distancia && aux1>aux2){
            distancia=aux2;
            auxposicion=posicion2;
            console.log("AQUII:",distancia,i,auxposicion);
          }
        }
    }
    let posicion_recogida=auxposicion;
    console.log('posicion_recogida:',posicion_recogida);
    let copiapuntos=[]; 
    let copiapuntos2=puntos;
    for(let i=0;i<puntos.length;i++)
    {
      if(Number(puntos[i].posicion)>=posicion_recogida)
      {
        puntos[i].posicion=Number(puntos[i].posicion)+1;
        copiapuntos.push(puntos[i]); //copia de puntos despuesde el de recogida
      }
    }
    console.log("CopiaPuntos",copiapuntos);
    let auxiliar={
      id_punto:0,
      id_ruta:0,
      latitud:puntosrecogida[k].latitud,
      longitud:puntosrecogida[k].longitud,
      posicion:posicion_recogida
    };
    puntos.push(auxiliar);
    copiapuntos2=puntos.sort(function (a, b) {
      return (a.posicion - b.posicion)
  });
  console.log("puntos ultimos para graficar",copiapuntos2);
    puntos=copiapuntos2;
    }
  this.recargar(puntos);
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
  console.log("Distancia"+lat2+"/"+lon2,d.toFixed(3));
 return d.toFixed(3); //Retorna tres decimales
  }

  recargar(points){
    this.calcularTiempos(points);
    this.markersArray=[];

    let latitud,longitud;
    for(let i=0;i<points.length;i++)
    {
      latitud=Number(points[i].latitud);
      longitud=Number(points[i].longitud);
      this.markeraux = new google.maps.Marker({position: {lat: latitud, lng: longitud},map: this.map,draggable: false});
      console.log(latitud+'/'+longitud);
      if(i!=0 && i!=points.length-1){
        for(let k=0;k<this.puntos_recogida.length;k++){
          console.log('latitud',Number(points[i].latitud)+'/'+Number(this.puntos_recogida[k].latitud));
          console.log('longitud',Number(points[i].longitud)+'/'+Number(this.puntos_recogida[k].longitud));
          
        if(Number(points[i].latitud)==Number(this.puntos_recogida[k].latitud) && Number(points[i].longitud)==Number(this.puntos_recogida[k].longitud)){
          this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        }
        else{
        this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        }
      }
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
     this.map = new google.maps.Map(document.getElementById('mapas'), {
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
    this.map = new google.maps.Map(document.getElementById('mapas'));
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
    this.sesa();
  }
  
}
