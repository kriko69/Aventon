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
      message:`ayuda conductor, ${this.id_usuario}`,
      duration:3000
    }).present();
  }
  

  

  cambiarUsuario()
  {
    let info;
    this.mysql.Tipo(this.id_usuario,'C').subscribe(
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
      nav.setRoot(VehiculoPage ,{id_usuario: this.id_usuario});
    },1000);
  }
 

    
  

}

    
  


