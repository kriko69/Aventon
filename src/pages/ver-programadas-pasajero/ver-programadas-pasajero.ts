import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, LoadingController } from 'ionic-angular';
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
import { mysqlService } from '../../services/mysql.service';
@IonicPage()
@Component({
  selector: 'page-ver-programadas-pasajero',
  templateUrl: 'ver-programadas-pasajero.html',
})
export class VerProgramadasPasajeroPage {
  suscrito1:ISubscription;

  id_usuario;
  latitud;
  longitud;
  diferentes=[];
  correos=[];
  viajes=[];

  //busqueda
  nombre:string='';
  precio:number;
  filtro;
  fecha=this.dameFecha();
  copia=[];
  resultados=[];
  vestimenta;
  puntos=[];
  copia_resultados;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public view:ViewController,private platform:Platform,
  public mysql:mysqlService,public load:LoadingController) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },15000);
    this.latitud=this.navParams.get('latitud');
    this.longitud=this.navParams.get('longitud');
    console.log(this.latitud+'////'+this.longitud);

    this.id_usuario=this.navParams.get('id_usuario');
    this.vestimenta=this.navParams.get('vestimenta');
    this.func();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerProgramadasPasajeroPage');
  }
  func(){
    this.presentLoading();
    this.mysql.listarRuta_viaje_programada().subscribe(
      data => {
        console.log('data',data);
        console.log('exito');
        this.copia=Object.assign(data);

        }, (error: any)=> {
          console.log('error', error);

        }
    );
    setTimeout(()=>{
      console.log(this.copia);
      this.copia_resultados=this.copia;
      let puntos=[];
      for(let i=0;i<this.copia.length;i++){
       this.sacar_punt(this.copia[i]);
        }
    },1500);
  }
  irReservaPasajero()
  {
    this.navCtrl.setRoot(ReservaPasajeroPage,{id_usuario:this.id_usuario});
  }


  irReservarProgramada(data)
  {
    this.navCtrl.setRoot(ReservarProgramadasPasajeroPage,{data:data,id_usuario:this.id_usuario,latitud:this.latitud,longitud:this.longitud,vestimenta:this.vestimenta});
  }

  dismiss(data)
  {
    this.navCtrl.setRoot(ReservaPasajeroPage,{id_usuario: this.id_usuario});
  }
  sacar_punt(obj){
    let puntos;
    console.log("ID_RUTA",obj.id_ruta);

    this.mysql.Get_Puntos(obj.id_ruta).subscribe(
      data => {
        puntos=Object.assign(data);
        console.log('puntos',puntos);
        }, (error: any)=> {
          console.log('error', error);
        }
    );
    setTimeout(()=>{
      console.log('obj',obj);
      console.log('puntos',puntos);
      if(puntos!=undefined){
        if(puntos['message']!='No se encontro rutas_viaje')
        {
          this.distancia(puntos,obj);
        }
      }
    },1500);
  }
  distancia(puntos,data){
    let lat;let long;
    let distancia;
    for(let i=0;i<puntos.length;i++){
        lat=puntos[i].latitud;
        long=puntos[i].longitud;
        distancia=this.getKilometros(this.latitud,this.longitud,lat,long);
        console.log('Data: '+data);
        if(distancia<=0.5 && data.id_conductor!=this.id_usuario ){
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
      let aux=this.copia[i].fecha.split(' ');
      console.log(aux[0]);

      if(aux[0]==this.fecha)
        this.resultados.push(this.copia[i]);
    }
    console.log(this.resultados);
    this.viajes=this.resultados;
  }
  filtrarpornombre()
  {
    console.log(this.filtro);
    console.log(this.nombre);
    console.log(this.copia_resultados);
    let copia_filtrar=this.copia_resultados;
    console.log(copia_filtrar);

    let aux=this.nombre.toUpperCase(); //el nombre
    this.resultados=[]; //limpio
    for (let i = 0; i < copia_filtrar.length; i++) {
      let auxNombre=copia_filtrar[i].nombre+' '+copia_filtrar[i].nombre;
      console.log(auxNombre);
      console.log(aux);
      if(auxNombre.toUpperCase().search(aux)>-1)
      this.resultados.push(copia_filtrar[i]);
    }


    if(this.nombre=='') //si el nombre esta en blanco igual limpio
      this.resultados=[];
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
    if(this.filtro=='Nombre')
      this.filtrarpornombre();
  }
  presentLoading() {
    const loader = this.load.create({
      content: "Espere por favor...",
      duration: 3000
    });
    loader.present();
  }
}



