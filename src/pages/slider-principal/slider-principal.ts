import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TipoUsuarioPage } from '../tipo-usuario/tipo-usuario';
/**
 * Generated class for the SliderPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { PasajeroPage } from '../pasajero/pasajero';
import { mysqlService } from '../../services/mysql.service';
@IonicPage()
@Component({
  selector: 'page-slider-principal',
  templateUrl: 'slider-principal.html',
})
export class SliderPrincipalPage {
  id_usuario=0;
  nombre_usuario='';
  info;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth:AngularFireAuth,
  private servicio: firebaseService,public mysql:mysqlService) {
 
    this.id_usuario = navParams.get('id_usuario');
    this.nombre_usuario = navParams.get('nombre_usuario');
    console.log('id:',this.id_usuario);

  }
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
  
  skip(tipo){
    let info;
    this.mysql.Tipo(this.id_usuario,tipo).subscribe(
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
    },3000);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPrincipalPage');
  }

}
