import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Usuario } from '../../interfaces/usuario.interface';
import { firebaseService } from '../../services/firebase.service';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { AngularFireAuth } from 'angularfire2/auth';

import { mysqlService } from '../../services/mysql.service';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {



  dataMYSQL={
    carnet:0,
    nombre:'',
    apellido:'',
    pass1:'',
    fecha_nac:this.dameFecha(),
    tipo:'',
    telf:0
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public servicio:firebaseService
  ,public alerta:AlertController,private afAauth:AngularFireAuth,private platform:Platform,
    public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
  }

  /*ionViewDidLoad(){
    this.servicio.getId();
  }*/


  registrar(Usuario)
  {
    let info={};
    console.log(Usuario);

    this.mysql.AgregarUsuario(Usuario).subscribe(
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

  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'Registrado exitoso!',
      subTitle: 'Ahora ya puedes ingresar a la aplicacion',
      buttons: ['OK']
    });
    alert.present();
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
}
