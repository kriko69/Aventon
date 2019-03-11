import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav,App, ToastController, Platform } from 'ionic-angular';
import { mysqlService } from '../../services/mysql.service';
import { firebaseService } from '../../services/firebase.service';
import { VehiculoPage } from './../vehiculo/vehiculo';

@IonicPage()
@Component({
  selector: 'page-slide-conductor',
  templateUrl: 'slide-conductor.html',
})
export class SlideConductorPage {
  slides = [
    {
      title: "Agregar un Vehículo",
      description: " <b>Puede agregar los vehículos que tenga.</b> ",
      image: "assets/slideConductor/addv.jpg",
    },
    {
      title: "Información del Vehículo",
      description: "<b>Complete todos los campos con la información del vehículo.</b> ",
      image: "assets/slideConductor/infov.jpg",
    },
    {
      title: "Listado de Vehículos ",
      description: "<b>Seleccioné el vehículo que va a utilizar para compartir un viaje.</b>",
      image: "assets/slideConductor/listav.jpg",
    },
    {
      title: "Confirmar el uso del Vehículo",
      description: "<b>Si los datos son correctos, entonces presione seleccionar vehículo.</b> ",
      image: "assets/slideConductor/selectv.jpg",
    },
    {
      title: "Rutas programadas",
      description: "<b>Para agregar una ruta nueva seleccione el boton +.</b> ",
      image: "assets/slideConductor/rutasv.jpg",
    },
    {
      title: "Programar ruta",
      description: "<b>Programe una ruta o agregue nuevas rutas con el boton +.</b> ",
      image: "assets/slideConductor/addruta.jpg",
    },
    {
      title: "Seleccione los puntos",
      description: "<b></b> ",
      image: "assets/slideConductor/puntos.gif",
    },
    {
      title: "Programando la ruta",
      description: "<b>Seleccione la ruta que agrego o una existente. Definir la hora y fecha en la realizara en recorrido.</b> ",
      image: "assets/slideConductor/programada.jpg",
    },
    {
      title: "Rutas programadas",
      description: "<b>Seleccione una ruta programada.</b> ",
      image: "assets/slideConductor/ruta.jpg",
    },
    {
      title: "Activar la ruta",
      description: "<b>Active la ruta si ya la comenzará.</b> ",
      image: "assets/slideConductor/activar.jpg",
    },
    {
      title: "Buzon",
      description: "<b>Seleccione un usuario, puede aceptar o rechazar su solicitud del pasajero.</b> ",
      image: "assets/slideConductor/buzon.jpg",
    },

  ];
  id_usuario;
  nombre_usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams,private toast:ToastController,
    public servicio: firebaseService, public app:App,private platform:Platform
    ,public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.id_usuario = navParams.get('id_usuario');
    this.nombre_usuario = navParams.get('nombre_usuario');
      let info;

  }
  ionViewDidLoad() {
  }
  

  

  skip()
  {

      var nav = this.app.getRootNav();
      nav.setRoot(VehiculoPage ,{id_usuario: this.id_usuario});
  }
 

    
  

}

    
  


