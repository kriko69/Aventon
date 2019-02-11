import { ReservaPasajeroPage } from './../reserva-pasajero/reserva-pasajero';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ReservarProgramadasPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { firebaseService } from '../../services/firebase.service';
import { PasajeroPage } from '../pasajero/pasajero';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-reservar-programadas-pasajero',
  templateUrl: 'reservar-programadas-pasajero.html',
})
export class ReservarProgramadasPasajeroPage {
  markersArray = [];
  markeraux:any;
  latOri  = -16.503720;
  longOri = -68.131247;
  map: any;
  email;
  data:any=[];
  rama;
  parser;
  latitud;
  longitud;
  solicitud={
    de: '',
    nombre:'',
    calificacion:0,
    mensaje: "Me puedes recoger?",
    estado:'pendiente',
    fechaViaje:'',
    horaViaje:'',
    latitud:'',
    longitud:''
  }; //la solicitud que le llega a el
  misolicitud={
    a: '',
    estado:'pendiente',
    fechaViaje:'',
    horaViaje:''
  }; //la solicitud que yo mande
  start;
  end;
  tiemposEntrePuntos=[];
  informacionTiempos='';
  miHora;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public alerta:AlertController) {
    this.latitud=this.navParams.get('latitud');
    this.longitud=this.navParams.get('longitud');
    this.email=this.navParams.get('email');
    this.data=this.navParams.get('data');
    console.log(this.data);

    this.rama=this.data.correo.split('.');
    this.parser=this.email.split('.');
    this.solicitud.de=this.parser[0];
    this.misolicitud.a=this.rama[0];

    this.solicitud.fechaViaje=this.data.fecha;
    this.solicitud.horaViaje=this.data.hora;
    this.misolicitud.fechaViaje=this.data.fecha;
    this.misolicitud.horaViaje=this.data.hora;

    this.solicitud.latitud=this.latitud;
    this.solicitud.longitud=this.longitud;

    this.servicio.obtenerNombreParaSolicitud(this.parser[0]).valueChanges().subscribe(
      datas=>{
        console.log(datas);
        this.solicitud.nombre=''+datas[9];
        this.solicitud.calificacion=Number(datas[2]);
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservarProgramadasPasajeroPage');
    this.recargar();
    this.ver(this.start,this.end);
  }

  enviar()
  {
    console.log(this.rama[0]);
    console.log(this.parser[0]);
    console.log(this.data.fecha);
    console.log(this.data.hora);
    this.servicio.definirSolicitarRef(this.rama[0],this.parser[0],this.data.fecha,this.data.hora);
    console.log(this.solicitud);

    this.servicio.addSolicitud(this.solicitud).then(
      ref=>{
        this.enviarAlMio();
        this.mostrarAlerta();
        this.navCtrl.setRoot(ReservaPasajeroPage,{email:this.email});

      }
    );
      this.distancia(this.data);

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
     directionsDisplay = new google.maps.DirectionsRenderer({
      //suppressMarkers: true
  });
     this.map = new google.maps.Map(document.getElementById('map1'), {
      center: {lat: this.latOri, lng: this.longOri},
      zoom:10
    });
    let waypts=[];
    for(let i=0;i<puntos;i++){
    waypts.push({
      location: this.markersArray[i].getPosition(),
      stopover: false
    });}
    console.log(waypts);
    directionsDisplay.setMap(this.map);
     this.start = this.markersArray[0].getPosition();
     this.end = this.markersArray[puntos-1].getPosition();
     var request = {
      origin: this.start,
      destination: this.end,
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

    let marker= new google.maps.Marker({position: {lat:this.latitud, lng: this.longitud},map: this.map,draggable: false});
    marker.setIcon('http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png');
    marker.setMap(this.map);

    var directionsService2=new google.maps.DirectionsService;
    var directionsDisplay2= new google.maps.DirectionsRenderer({
      draggable:true,
      map:null
    });
    var request2 = {
      origin: this.start,
      destination: new google.maps.LatLng(this.latitud,this.longitud),
      travelMode: 'DRIVING'
    };
    let tiempoDeMiPuntoDeRecogida;
    let horaViaje=this.data.hora;
    let miHora;
    let mapa=this.map;
    directionsService2.route(request2, function(result, status) {
      if (status == 'OK') {
        directionsDisplay2.setDirections(result);
        console.log('MI RECOGIDA: ',directionsDisplay2.getDirections());
        let sp=directionsDisplay2.getDirections().routes[0].legs[0].duration.text.split(' ');
        let minutos=Number(sp[0]);
        let split=horaViaje.split(':')
        let h=Number(split[0]);
        let m=Number(split[1]);
        let segundos1=m*60;
        let segundos2=h*3600;
        let segundos3=minutos*60;
        let suma=segundos1+segundos2+segundos3;
        let min=Math.floor(suma/3600);
        suma=suma-(3600*min);
        let seg=suma/60;
        if(seg<10)
        {
          tiempoDeMiPuntoDeRecogida=min+':0'+seg;
        }else{
          tiempoDeMiPuntoDeRecogida=min+':'+seg;
        }
      }
      let separar=tiempoDeMiPuntoDeRecogida.split(':');
      if(Number(separar[0])<11){
        tiempoDeMiPuntoDeRecogida+=' pm';
      }
      else{
        tiempoDeMiPuntoDeRecogida+=' am';
      }
      console.log(tiempoDeMiPuntoDeRecogida);
      var infowindow = new google.maps.InfoWindow({
        content: tiempoDeMiPuntoDeRecogida
      });
      marker.addListener('click', function() {
        infowindow.open(mapa, marker);
      });

    });



  }
  dismiss()
  {
    this.navCtrl.setRoot(ReservaPasajeroPage,{email: this.email});
  }
  distancia(data){
    let latlong;
    let lat;let long;
    let distancia;
    let puntos=data.ruta.split(';');
    let dismin=10000;let latlongmin=puntos[0].split('/');
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
      //this.servicio.updatePro(data);  //esto guarda la recogida en programadas
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



  ver(inicio,fin)
  {
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
    let waypts=[];
    for(let i=0;i<puntos;i++){
    waypts.push({
      location: this.markersArray[i].getPosition(),
      stopover: true
    });}
    var directionsService= new google.maps.DirectionsService;
    var directionsDisplay= new google.maps.DirectionsRenderer({
      draggable:true,
      map:null
    });
    // for(let i=0;i<waypoints.length;i++)
    // {
    //   waypoints[i].stopover=true;
    // }

    directionsService.route(
      {
        origin:inicio,
        destination:fin,
        travelMode:'DRIVING',
        waypoints:waypts
      },function(result, status) {
        if (status == 'OK') {

          directionsDisplay.setDirections(result);
          console.log('direcc',directionsDisplay.getDirections());
          let aux=0;
          let tiempos=[];
          for(var i=0;i<directionsDisplay.getDirections().routes[0].legs.length;i++)
          {
            if(i!=0 && i!=directionsDisplay.getDirections().routes[0].legs.length-1)
            {

              let split=directionsDisplay.getDirections().routes[0].legs[i].duration.text.split(' ');
              let minutos=Number(split[0]);
              tiempos.push(minutos);
            }
          }
          for (let i = 0; i < tiempos.length; i++) {
            if(i!=0)
            {
              tiempos[i]=tiempos[i]+tiempos[i-1];
            }

          }
          console.log('tiempos',tiempos);
          this.tiemposEntrePuntos=tiempos;


        }

      }
      );
      console.log(this.tiemposEntrePuntos);
      setTimeout(() => {
        
      this.ruta(inicio);
      }, 1000);
    }

  ruta(inicio)
  {
    let horaViaje=this.data.hora;
    let puntitos=this.markersArray;
    let infowindow = new google.maps.InfoWindow();
    let mapita=this.map;
    let horas=[];
    var directionsService= new google.maps.DirectionsService;
    var directionsDisplay= new google.maps.DirectionsRenderer({
      draggable:true,
      map:null
    });

    // for(let i=0;i<waypoints.length;i++)
    // {
    //   waypoints[i].stopover=true;
    // }
    directionsService.route(
      {
        origin:inicio,
        destination:new google.maps.LatLng(this.latitud,this.longitud),
        travelMode:'DRIVING'
      },function(result, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(result);
          console.log('mi punto',directionsDisplay.getDirections());
          let split=directionsDisplay.getDirections().routes[0].legs[0].duration.text.split(' ');
          let minutos=Number(split[0]);
          let text='';
          console.log('tiemposEntrePuntos',horaViaje);
          let llegadas='';
          let separar=horaViaje.split(':');
          if(Number(separar[0])<11){
            llegadas+='<b>Hora de partida:</b> '+horaViaje+' pm. <br>';
            horas.push(horaViaje+' am');
          }
          else{
            llegadas+='<b>Hora de partida:</b> '+horaViaje+' am. <br>';
            horas.push(horaViaje+' pm');
          }



          for (let i = 0; i < this.tiemposEntrePuntos.length; i++) {
            let split=horaViaje.split(':');
              let h=Number(split[0]);
              let m=Number(split[1]);
              let segundos1=m*60;
              let segundos2=h*3600;
              let segundos3=this.tiemposEntrePuntos[i]*60;
              let suma=segundos1+segundos2+segundos3;
              let min=Math.floor(suma/3600);
              suma=suma-(3600*min);
              let seg=suma/60;
              let horario;
              if(seg<10)
              {
                if(min<11)
                  horario=''+min+':0'+seg+' pm';
                else
                  horario=''+min+':0'+seg+' am';
              }else{
                if(min<11)
                  horario=''+min+':'+seg+' pm';
                else
                  horario=''+min+':'+seg+' am';
              }
              horas.push(horario);

            if(i!=this.tiemposEntrePuntos.length-1)
            {
              llegadas+='<b>Hora en el punto '+(i+1)+':</b> '+horario+'. <br>';
            }else{
              llegadas+='<b>Hora de llegada a la UCB:</b> '+horario+'. <br>';
            }

          }
          console.log('TIEMPITOS: ',this.tiemposEntrePuntos);
          console.log('PUNTITOS: ',puntitos);
          console.log('HORAS: ',horas);
          console.log(mapita);

          for (var i = 0; i < puntitos.length; i++) {
            google.maps.event.addListener(puntitos[i], 'click', (function (marker, i) {
              return function () {
                  infowindow.setContent(horas[i]);
                  infowindow.open(mapita, puntitos[i]);
              }
          })(puntitos[i], i));
          }
          console.log(llegadas);

          console.log('minutos: ',minutos);
          if(true)
          {
            let split=horaViaje.split(':');
              let h=Number(split[0]);
              let m=Number(split[1]);
              let segundos1=m*60;
              let segundos2=h*3600;
              let segundos3=minutos*60;
              let suma=segundos1+segundos2+segundos3;
              let min=Math.floor(suma/3600);
              suma=suma-(3600*min);
              let seg=suma/60;
              let horario;
              if(seg<10)
              {
                if(min<11)
                  horario=''+min+':0'+seg+' pm';
                else
                  horario=''+min+':0'+seg+' am';
              }else{
                if(min<11)
                  horario=''+min+':'+seg+' pm';
                else
                  horario=''+min+':'+seg+' am';
              }
              llegadas+='<b>Hora de llegada a tu punto:</b> '+horario+'. <br>';
          }


          document.getElementById('horario').innerHTML=llegadas;



          for (let i = 0; i < this.tiemposEntrePuntos.length; i++) {

            if(i!=this.tiemposEntrePuntos.length-1)
            {
              text+='<b>Desde el inicio hasta el punto '+(i+1)+'<ion-icon name="pin" style="background-color:green"></ion-icon>'+':</b> '+this.tiemposEntrePuntos[i]+' min <br>';
            }
            else
            {
              text+='<b>Desde el inicio hasta la UCB:</b> '+this.tiemposEntrePuntos[i]+' min \n';
            }

          }

          this.informacionTiempos=text;
          console.log(this.informacionTiempos);
          document.getElementById('tiempos').innerHTML=this.informacionTiempos;
          document.getElementById('recogida').innerHTML='<b>Desde el inicio hasta tu recogida:</b> '+minutos+' min \n';

        }
      }

    );


  }

  sacarHora(hora,tiempo)
  {
    let split=hora.split(':');
    let h=Number(split[0]);
    let m=Number(split[1]);
    let segundos1=m*60;
    let segundos2=h*3600;
    let segundos3=tiempo*60;
    let suma=segundos1+segundos2+segundos3;
    let min=Math.floor(suma/3600);
    suma=suma-(3600*min);
    let seg=suma/60;
    if(seg<10)
    {
      return ''+min+':0'+seg;
    }else{
      return ''+min+':'+seg;
    }
  }

}


/**   */
