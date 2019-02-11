import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { ReservaPasajeroPage } from '../reserva-pasajero/reserva-pasajero';
import { ReservarProgramadasPasajeroPage } from '../reservar-programadas-pasajero/reservar-programadas-pasajero';

import { firebaseService } from '../../services/firebase.service';

/**
 * Generated class for the VerProgramadasPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { ISubscription } from "rxjs/Subscription";
@IonicPage()
@Component({
  selector: 'page-ver-programadas-pasajero',
  templateUrl: 'ver-programadas-pasajero.html',
})
export class VerProgramadasPasajeroPage {
  suscrito1:ISubscription;

  email;
  latitud;
  longitud;
  diferentes=[];
  correos=[];
  aux; //lista las datas
  rama;
  viajes=[];

  //busqueda
  nombre:string='';
  precio:number;
  filtro;
  fecha;
  copia=[];
  resultados=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public view:ViewController,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.latitud=this.navParams.get('latitud');
    this.longitud=this.navParams.get('longitud');
    console.log(this.latitud+'////'+this.longitud);

    this.email=this.navParams.get('email');
    this.rama=this.email.split('.');
    this.suscrito1=this.servicio.getProgramadasRefTotal().valueChanges().subscribe(
      data =>{
        for(this.aux of data)
        {
          if(this.aux.correo!=this.email && this.aux.capacidad!=0)
          {
            this.diferentes.push(this.aux);
          }
        }
        console.log(this.diferentes);

      }
    );
    setTimeout(()=>{
      this.suscrito1.unsubscribe();
      this.viajes=[];
      for(let i=0;i<this.diferentes.length;i++){
        this.distancia(this.diferentes[i]);
        console.log(i+': '+this.viajes);
        console.log(this.viajes);
        this.copia=this.viajes;
      }
    },2000);
    this.fecha=this.dameFecha();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerProgramadasPasajeroPage');
  }

  irReservaPasajero()
  {
    this.navCtrl.setRoot(ReservaPasajeroPage,{email:this.email});
  }


  irReservarProgramada(data)
  {
    this.navCtrl.setRoot(ReservarProgramadasPasajeroPage,{data:data,email:this.email,latitud:this.latitud,longitud:this.longitud});
  }

  dismiss(data)
  {
    this.navCtrl.setRoot(ReservaPasajeroPage,{email: this.email});
  }
  distancia(data){
    let latlong;
    let lat;let long;
    let distancia;
    let puntos=data.ruta.split(';');
    for(let i=0;i<puntos.length;i++){
        latlong=puntos[i].split('/');
        lat=Number(latlong[0]);
        long=Number(latlong[1]);
        distancia=this.getKilometros(this.latitud,this.longitud,lat,long);
        console.log('DISTANCIA: '+distancia);
        if(distancia<=0.5){
            this.viajes.push(data);
            break;
        }
    }
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

  filtrarporfecha()
  {
    console.log(this.filtro);
    console.log(this.fecha);
    console.log(this.copia);
    this.resultados=[]; //limpio
    for (let i = 0; i < this.copia.length; i++) {
      console.log(this.copia[i].fecha);

      if(this.copia[i].fecha==this.fecha)
        this.resultados.push(this.copia[i]);
    }
    console.log(this.resultados);
    this.viajes=this.resultados;
  }
  filtrarpornombre()
  {
    console.log(this.filtro);
    console.log(this.nombre);
    console.log(this.copia);
    let aux=this.nombre.toUpperCase();
    this.resultados=[]; //limpio
    for (let i = 0; i < this.copia.length; i++) {
      if(this.copia[i].conductor.toUpperCase().search(aux)>-1)
      this.resultados.push(this.copia[i]);
    }
    if(this.nombre=='') //si el nombre esta en blanco igual limpio
      this.resultados=[];
    console.log(this.resultados);
    this.viajes=this.resultados;
  }
  filtrarporprecio()
  {
    console.log(this.filtro);
    console.log(this.precio);
    console.log(this.copia);
    this.resultados=[]; //limpio
    for (let i = 0; i < this.copia.length; i++) {
      if(this.copia[i].precio==this.precio)
        this.resultados.push(this.copia[i]);
    }
    console.log(this.resultados);
    this.viajes=this.resultados;
  }

  dameFecha()
  {
    let hoy = new Date();
    let dd = hoy.getDate();
    let mm = hoy.getMonth()+1;
    let yyyy = hoy.getFullYear();
    let date=yyyy+'-'+mm+'-'+dd;
    return date;
  }

  mostrar()
  {
    console.log(this.filtro);
    if(this.filtro=='Fecha')
      this.filtrarporfecha();
    if(this.filtro=='Precio')
      this.filtrarporprecio();
    if(this.filtro=='Nombre')
      this.filtrarpornombre();
  }
}



