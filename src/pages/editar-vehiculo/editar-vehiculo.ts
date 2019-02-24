import { ConductorPage } from './../conductor/conductor';
import { VehiculoPage } from './../vehiculo/vehiculo';
import { Vehiculo } from './../../interfaces/vehiculo.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';
import { mysqlService } from '../../services/mysql.service';

import {FormGroup, FormBuilder, Validators} from '@angular/forms'; // Para la validacion del formulario
import { Camera } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the EditarVehiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-vehiculo',
  templateUrl: 'editar-vehiculo.html',
})
export class EditarVehiculoPage {

  auto:any;
  id_usuario;
  
  submitAttempt: boolean = false;
  myForm: FormGroup;

  pic : string= "http://192.168.0.107/aventon/img/Autos/312AZN.jpg"

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public toast:ToastService,private platform:Platform,
  public mysql:mysqlService,public formBuilder: FormBuilder, public camera:Camera,
  private http: HttpClient) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario=this.navParams.get('id_usuario');
    this.auto=this.navParams.get('auto');
    console.log(this.id_usuario);
    console.log('AUTO: '+this.auto.placa+' id: '+this.auto.id_auto);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarVehiculoPage');
  }

  actualizar()
  {
    let info={};
    this.mysql.UpdateAutos(this.auto).subscribe(
      data => {
        console.log('data', data);
        info= Object.assign(data);
        console.log('exito');
        }, (error: any)=> {
          console.log('error', error);
        }
    );
    setTimeout(()=>{
      if (info["message"]=='OK')
      {
        this.toast.show(` Vehiculo ${this.auto.marca} ${this.auto.placa} actualizado!`);
          this.navCtrl.setRoot(VehiculoPage,{id_usuario: this.id_usuario});
        console.log("se edito");
      }
    },1000);
  }

  eliminar()
  {
    this.mysql.EliminarAuto(Number(this.auto.id_auto)).subscribe(
      data => {
        console.log('data eliminar', data);
        }, (error: any)=> {
          console.log('error', error);
        }
    );
    this.toast.show(` Vehiculo ${this.auto.marca} ${this.auto.placa} eliminado!`);
        this.navCtrl.setRoot(VehiculoPage,{id_usuario: this.id_usuario});
      console.log("se elimino");
  }

  irConductor()
  {
    this.navCtrl.setRoot(ConductorPage,{id_usuario:this.id_usuario,id_auto:this.auto.id_auto});
  }
}
