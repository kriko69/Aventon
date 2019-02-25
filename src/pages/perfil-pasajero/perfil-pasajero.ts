import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { VehiculoPage } from '../vehiculo/vehiculo';
import { firebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario.interface';

import { ISubscription } from 'rxjs/Subscription';
import { EditarPasajeroPage } from '../editar-pasajero/editar-pasajero';

import {FormGroup, FormBuilder, Validators} from '@angular/forms'; // Para la validacion del formulario
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { mysqlService } from '../../services/mysql.service';
/**
 * Generated class for the PerfilPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-pasajero',
  templateUrl: 'perfil-pasajero.html',
})
export class PerfilPasajeroPage {


  usuario;
  fotoUsuario: string;
  val: boolean=false;
  base64Image: string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,
    public servicio: firebaseService,private platform:Platform, public camera:Camera,
    private http: HttpClient,public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
      },10000);
      this.usuario = navParams.get('usuario');
    console.log(this.usuario);
  }

  ionViewDidLoad() {
    this.fotoUsuario = this.usuario.ci;
      this.mysql.validarFotoUsuario(this.fotoUsuario).subscribe(
        data=>{
          if(data['message']=="existe")
          {
            this.fotoUsuario = "http://ionic-web.000webhostapp.com/img/Perfil/"+this.fotoUsuario + ".jpg";
          }
          if(data['message']=="no existe")
          {
            this.fotoUsuario = "http://ionic-web.000webhostapp.com/img/defaultUsuario.jpg";
          }
          this.base64Image=this.fotoUsuario;
        },error=>{
          
        }
        
      );
  }
  editPerfil()
  {
    var nav = this.app.getRootNav();
    nav.setRoot(EditarPasajeroPage,{usuario: this.usuario});//MODIFICADO PARA PASAR LOS PARAMETROS
  }


}
