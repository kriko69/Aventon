import { EditarVehiculoPage } from './../editar-vehiculo/editar-vehiculo';
import { Vehiculo } from './../../interfaces/vehiculo.interface';
import { Observable } from 'rxjs/Observable';
import { AgregarVehiculosPage } from './../agregar-vehiculos/agregar-vehiculos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the VehiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { firebaseService } from '../../services/firebase.service';
import { mysqlService } from '../../services/mysql.service';

@IonicPage()
@Component({
  selector: 'page-vehiculo',
  templateUrl: 'vehiculo.html',
})
export class VehiculoPage {

  vehiculos$;
  value;
  id_usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,private platform:Platform,
  public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario=navParams.get('id_usuario');

    let info={};
    this.mysql.GetAutos(this.id_usuario).subscribe(
      data => {
        console.log('data',data);
        console.log('exito');
        info=Object.assign(data);

        }, (error: any)=> {
          console.log('error', error);

        }
    );
    setTimeout(()=>{
      console.log(info);
    },3000);    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiculoPage');
  }

  irAgregar()
  {
    this.navCtrl.push(AgregarVehiculosPage,{id_usuario:this.id_usuario});
    
  }

  irEditar(auto:Vehiculo)
  {
    this.navCtrl.push(EditarVehiculoPage,{auto:auto,id_usuario:this.id_usuario});
  }
}
