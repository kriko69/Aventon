import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { Usuario } from '../../interfaces/usuario.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseService } from '../../services/firebase.service';
import { AgregarVehiculosPage } from '../agregar-vehiculos/agregar-vehiculos';
import { EditarVehiculoPage } from '../editar-vehiculo/editar-vehiculo';
import { Vehiculo } from '../../interfaces/vehiculo.interface';
import { VehiculoPage } from '../vehiculo/vehiculo';

import { ISubscription } from 'rxjs/Subscription';
import { EditarConductorPage } from '../editar-conductor/editar-conductor';
import { LoginPage } from '../login/login';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { mysqlService } from '../../services/mysql.service';

@IonicPage()
@Component({
  selector: 'page-perfil-conductor',
  templateUrl: 'perfil-conductor.html',
})
export class PerfilConductorPage {

  id_usuario;
  usuario=[];
  auto;
  tipo='';
  value;
  id_auto;
  data:Usuario={  };
  info:any;
  user=[];
  vehiculos=[];
  controlP:ISubscription;
  controlV:ISubscription;
  fotoAuto: string;
  val: boolean=false;
  base64Image: string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,
    public servicio: firebaseService,private platform:Platform, public camera:Camera,
    private http: HttpClient,public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
      },10000);
    this.id_usuario = navParams.get('id_usuario');
    this.id_auto = navParams.get('id_auto');
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
    this.fotoAuto = this.id_usuario;
    this.mysql.validarFotoUsuario(this.fotoAuto).subscribe(
      data=>{
        if(data['message']=="existe")
        {
          this.fotoAuto = "http://181.114.114.160/aventon/img/Perfil/"+this.fotoAuto + ".jpg";
        }
        if(data['message']=="no existe")
        {
          this.fotoAuto = "http://181.114.114.160/aventon/img/defaultUsuario.jpg";
        }
        this.base64Image=this.fotoAuto;
      },error=>{
        
      }
      
    );
  }
  editPerfil()
  {
    var nav = this.app.getRootNav();
    nav.setRoot(EditarConductorPage,{id_usuario: this.id_usuario,id_auto:this.id_auto});//MODIFICADO PARA PASAR LOS PARAMETROS
  }
  verVehiculo()
  {
    var nav = this.app.getRootNav();
    nav.push(VehiculoPage,{id_usuario:this.id_usuario});

  }

}
