import { VehiculoPage } from './../vehiculo/vehiculo';
import { Vehiculo } from './../../interfaces/vehiculo.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';

/**
 * Generated class for the TipoUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { ConductorPage } from './../conductor/conductor';
import { LoginPage } from './../login/login';


import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { PasajeroPage } from '../pasajero/pasajero';
import { mysqlService } from '../../services/mysql.service';

@IonicPage()
@Component({
  selector: 'page-tipo-usuario',
  templateUrl: 'tipo-usuario.html',
})
export class TipoUsuarioPage {

  id_usuario=0;
  nombre_usuario='';
  info;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth:AngularFireAuth, private toast:ToastController,
  private servicio: firebaseService, private db:AngularFireDatabase,private platform:Platform
  ,public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario = navParams.get('id_usuario');
    this.nombre_usuario = navParams.get('nombre_usuario');
    console.log('id:',this.id_usuario);

  }

  ionViewDidLoad() {
    this.toast.create({
      message:`bienvenido, ${this.nombre_usuario}`,
      duration:3000
    }).present();
  }
  tipo='';
  irConductor()
  {
    this.cambiarTipo('C');
    this.navCtrl.push(VehiculoPage,{id_usuario: this.id_usuario});//MODIFICADO PARA PASAR LOS PARAMETROS*/
  }
  irPasajero()
  {
    this.cambiarTipo('P');
    this.navCtrl.setRoot(PasajeroPage,{id_usuario: this.id_usuario});//MODIFICADO PARA PASAR LOS PARAMETROS
  }
  cambiarTipo(tipo){
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


}
