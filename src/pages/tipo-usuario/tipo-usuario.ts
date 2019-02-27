import { VehiculoPage } from './../vehiculo/vehiculo';
import { Vehiculo } from './../../interfaces/vehiculo.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav,App, ToastController, Platform } from 'ionic-angular';
import { SliderPrincipalPage } from '../slider-principal/slider-principal';

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
  usuario;
  info;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
   private toast:ToastController, private platform:Platform, public app:App
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

    setTimeout(()=>{
      this.usuario=info;
      this.usuario=this.usuario[0];
      this.nombre_usuario = this.usuario.nombre+' '+this.usuario.apellido;
      console.log('id:',this.id_usuario);
      this.toast.create({
        message:`Bienvenido, ${this.nombre_usuario}`,
        duration:2000
      }).present();      
    },2000);

  }

  ionViewDidLoad() {
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
  slidePrincipal3()
  {
    this.slide();
    this.navCtrl.push(SliderPrincipalPage,{id_usuario: this.id_usuario,nombre_usuario:this.nombre_usuario});//MODIFICADO PARA PASAR LOS PARAMETROS*/
    
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
    },1000);
  }
  slide(){
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
    },1000);
  }
 

}
