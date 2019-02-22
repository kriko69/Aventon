import { Component, ViewChild} from '@angular/core';

import { IonicPage, NavController, NavParams,Nav,App, ToastController, Platform } from 'ionic-angular';
import { TipoUsuarioPage } from '../tipo-usuario/tipo-usuario';
import { LoginPage } from '../login/login';
import { firebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { PerfilPasajeroPage } from '../perfil-pasajero/perfil-pasajero';
import { mysqlService } from '../../services/mysql.service';
@IonicPage()
@Component({
  selector: 'page-slider-principal',
  templateUrl: 'slider-principal.html',
})
export class SliderPrincipalPage {

  slides = [
    {
      title: "Bienvenido a Auto Compartido!",
      description: " <b>Comparte un viaje.",
      image: "assets/logo.png",
    },
    {
      title: "Que es Auto Compartido?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/logo.png",
    },
    {
      title: "Como comenzar?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/logo.png",
    }
  ];
  id_usuario;
  usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams,private toast:ToastController,
    public servicio: firebaseService, public app:App,private platform:Platform
    ,public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.id_usuario = navParams.get('id_usuario');
      let info;
    this.mysql.GetUsuario(this.id_usuario).subscribe(
      data => {
        console.log('data', data);
        info= Object.assign(data);
        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

        }
    );

  }
  ionViewDidLoad() {
    this.toast.create({
      message:`ayuda, ${this.usuario}`,
      duration:3000
    }).present();
  }
  

  

  cambiarUsuario()
  {
    let info;
    this.mysql.Tipo(this.id_usuario,'').subscribe(
      data => {
        console.log('data', data);
        info= Object.assign(data);
        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);

        }
    );

    setTimeout(()=>{
      console.log('info',info);
      var nav = this.app.getRootNav();
      let nom=this.usuario[0].nombre+' '+this.usuario[0].apellido;
      nav.setRoot(TipoUsuarioPage ,{id_usuario: this.id_usuario,nombre_usuario:nom});
    },3000);
  }
 

    
  

}
