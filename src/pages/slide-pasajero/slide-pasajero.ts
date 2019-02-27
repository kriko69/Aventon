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
      title: "Slide 1",
      description: " <b>Comparte un viaje.</b> ",
    //  image: "assets/logo.png",
    },
    {
      title: "Slide 2",
      description: "<b>Aventon</b> El componente Aventón ayuda a la comunidad a reservar un puesto en un vehículo particular de alguien que postea su recorrido hacia la universidad. Se tomó en cuenta 2 tipos de usuarios: Conductor y Pasajero.",
    //  image: "assets/compartir.png",
    },
    {
      title: "Slide 3",
      description: "<b>Seleccioné el tipo de usuario que es.</b> Para cada tipo de usuario se contara con un boton de ayuda para tener un mejor manejo de la aplicación.",
    //  image: "assets/tipousuario.jpeg",
    }
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
      nav.setRoot(PuntoRecogidaPage ,{id_usuario: this.id_usuario});
  }
 
}