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

@IonicPage()
@Component({
  selector: 'page-tipo-usuario',
  templateUrl: 'tipo-usuario.html',
})
export class TipoUsuarioPage {

  email='';
  info;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth:AngularFireAuth, private toast:ToastController,
  private servicio: firebaseService, private db:AngularFireDatabase,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email = navParams.get('email');
    let aux= this.email.split('.');
    this.servicio.obtenerInicioSesion(aux[0]).valueChanges().subscribe(
      (data)=>{
        this.info=data;
      }
    );

  }

  ionViewDidLoad() {
      console.log(this.email);
    this.afAuth.authState.subscribe(data =>{
      if(data.email && data.uid)
      {
        this.toast.create({
          message:`bienvenido, ${data.email}`,
          duration:3000
        }).present();
      }
    });
  }
  tipo='';
  data={correo:this.email,tipo:this.tipo};
  irConductor()
  {
    let aux= this.email.split('.');
    this.data.correo = this.email;
    this.tipo='c';
    this.data.tipo = this.tipo;
    this.servicio.editC(this.data,aux);//poner c en el perfil de la base de datos
    
    //console.log(this.info[5]);
    this.info[6]++;
    //console.log(this.info[5]);
    
    this.servicio.editarInicioSesionConductor(aux[0],this.info[6]);

    this.navCtrl.push(VehiculoPage,{tipo:this.tipo,email: this.email});//MODIFICADO PARA PASAR LOS PARAMETROS
  }
  irPasajero()
  {
    let aux= this.email.split('.');
    this.data.correo = this.email;
    this.tipo='p';
    this.data.tipo = this.tipo;
    this.servicio.editP(this.data,aux);//poner p en el perfil de la base de dato
    this.info[7]++;
    this.servicio.editarInicioSesionPasajero(aux[0],this.info[7]);
    this.navCtrl.setRoot(PasajeroPage,{tipo:this.tipo,email: this.email});//MODIFICADO PARA PASAR LOS PARAMETROS
  }


}
