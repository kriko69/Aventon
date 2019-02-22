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
import { mysqlService } from '../../services/mysql.service';
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
  id_usuario;
  data:any=[];
  parser;
  latitud;
  longitud;
  solicitud={
    id_de:0,
    id_para:0,
    id_viaje:0,
    mensaje: "Me puedes recoger?",
    estado:'Pendiente',
    fecha:this.dameFecha(),
    latitud:'',
    longitud:'',
    sombrero:'',
    superior:'',
    inferior:'',
    accesorio:''
  }; 
  start;
  end;
  tiemposEntrePuntos=[];
  informacionTiempos='';
  miHora;
  vestimenta;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public alerta:AlertController,public mysql:mysqlService) {
    this.latitud=this.navParams.get('latitud');
    this.longitud=this.navParams.get('longitud');
    this.id_usuario=this.navParams.get('id_usuario');
    this.data=this.navParams.get('data');
    this.vestimenta=this.navParams.get('vestimenta');

    this.solicitud.id_de=this.id_usuario;
    this.solicitud.id_para=this.data.id_conductor;
    this.solicitud.id_viaje=this.data.id_viaje;
    this.solicitud.fecha=this.dameFecha();
    this.solicitud.latitud=this.latitud;
    this.solicitud.longitud=this.longitud;
    this.solicitud.sombrero=this.vestimenta.zsombrero;
    this.solicitud.superior=this.vestimenta.zsuperior;
    this.solicitud.inferior=this.vestimenta.zinferior;    
    this.solicitud.accesorio=this.vestimenta.zaccesorio;
    this.obtnuntos();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservarProgramadasPasajeroPage');
    //this.recargar();
    //this.ver(this.start,this.end);
  }
  obtnuntos(){
    let puntos;
    console.log('ruta',this.data.id_ruta);
    console.log('usuario',this.id_usuario);
    this.mysql.Get_Puntos(this.data.id_ruta).subscribe(
      data=>{
        console.log('puntos rutas: ',data);
        puntos=data;
      },(error)=>{
        console.log(error);
      }
    );
    setTimeout(()=>{
      console.log('puntos',puntos);
      this.recargar(puntos);
    },1000);
  }
  enviar()
  {
    let info;
    this.mysql.insertarSolicitud(this.solicitud).subscribe(
      data => {
        info=Object.assign(data);
        }, (error: any)=> {
          console.log('error', error);
        }
    );
    setTimeout(()=>{
      console.log(info);
    },3000);

  }


  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'Solicitud Enviada!',
      subTitle: 'Espera a la respuesta en tu buzon',
      buttons: ['OK']
    });
    alert.present();
  }
  /*recargar(){
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



  }*/
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
     this.map = new google.maps.Map(document.getElementById('map1'), {
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
    this.map = new google.maps.Map(document.getElementById('map1'));
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
    this.navCtrl.setRoot(ReservaPasajeroPage,{id_usuario: this.id_usuario});
  }
  /*distancia(data){
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
  }*/



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
    let date=yyyy+'-'+mm+'-'+dd+' '+hora+':'+minutos+':'+segundos;

    return date;
  }

}


/**   */
