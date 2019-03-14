import { Component, ViewChild} from '@angular/core';

import { IonicPage, NavController, NavParams,Nav,App, ToastController, Platform } from 'ionic-angular';
import { TipoUsuarioPage } from '../tipo-usuario/tipo-usuario';
import { LoginPage } from '../login/login';
import { firebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { PerfilPasajeroPage } from '../perfil-pasajero/perfil-pasajero';
import { mysqlService } from '../../services/mysql.service';
import { PasajeroPage } from '../pasajero/pasajero';
import { PuntoRecogidaPage } from '../punto-recogida/punto-recogida';
import { ReservaPasajeroPage } from '../reserva-pasajero/reserva-pasajero';
/**
 * Generated class for the SlidePasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slide-pasajero',
  templateUrl: 'slide-pasajero.html',
})
export class SlidePasajeroPage {
  slides = [
    {
      title: "Seleccioné su ubicación",
      description: " <b>Haga click en ir a mi posición y aceptar.</b>Tenga el gps activado. ",
    image: "assets/slidePasajero/punto.png",
    },
    {
      title: "Datos para el momento de ser recogido.",
      description: "<b>Complete los campos del formulario con los datos que corresponden.</b> ",
    image:  "assets/slidePasajero/ropa.png",
    },
    {
      title: "Reserva",
      description: "<b>Seleccioné la ruta que quiera.</b>",
   image:  "assets/slidePasajero/seleccionar.png",
    },
    {
      title: "Confirme",
      description: "<b>Confirme y espere la hora especificada con el codigo QR en el punto de espera.</b>",
      image:  "assets/slidePasajero/solicitar.png",
    }
  ];
  id_usuario;
  nombre_usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams,private toast:ToastController,
    public servicio: firebaseService, public app:App,private platform:Platform
    ,public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },1000);
    this.id_usuario = navParams.get('id_usuario');
    this.nombre_usuario = navParams.get('nombre_usuario');
      let info;
  }
  ionViewDidLoad() {
  }
  

  

  skip()
  {
      var nav = this.app.getRootNav();
      nav.setRoot(ReservaPasajeroPage ,{id_usuario: this.id_usuario});
  }
 
}