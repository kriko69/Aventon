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


  id_usuario;
  usuario=[];
  fotoUsuario: string;
  val: boolean=false;
  base64Image: string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,
    public servicio: firebaseService,private platform:Platform, public camera:Camera,
    private http: HttpClient,public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
      },10000);
      this.id_usuario = navParams.get('id_usuario');
    console.log(this.id_usuario);
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
      this.usuario=info[0];
      console.log(this.usuario);
      
    },1000);
  }

  ionViewDidLoad() {
    this.fotoUsuario = this.id_usuario;
      this.mysql.validarFotoUsuario(this.fotoUsuario).subscribe(
        data=>{
          if(data['message']=="existe")
          {
            this.fotoUsuario = "http://181.114.114.160/aventon/img/Perfil/"+this.fotoUsuario + ".jpg";
          }
          if(data['message']=="no existe")
          {
            this.fotoUsuario = "http://181.114.114.160/aventon/img/defaultUsuario.jpg";
          }
          this.base64Image=this.fotoUsuario;
        },error=>{
          
        }
        
      );
  }
  editPerfil()
  {
    var nav = this.app.getRootNav();
    nav.setRoot(EditarPasajeroPage,{id_usuario: this.id_usuario});//MODIFICADO PARA PASAR LOS PARAMETROS
  }


}
