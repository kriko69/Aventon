import { VehiculoPage } from './../vehiculo/vehiculo';
import { Vehiculo } from './../../interfaces/vehiculo.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';
import { mysqlService } from '../../services/mysql.service';

/**
 * Generated class for the AgregarVehiculosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar-vehiculos',
  templateUrl: 'agregar-vehiculos.html',
})
export class AgregarVehiculosPage {

  public auto:Vehiculo={
    capacidad:0,
    color:'',
    maletera:false,
    marca:'',
    modelo:2000,
    placa:'',
    estado:false,
    id_usuario:0
  };
  id_usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,public toast:ToastService,private platform:Platform,
  public mysql:mysqlService) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    //this.id_usuario=navParams.get('id_usuario');
    this.id_usuario=6139532;

    this.auto.id_usuario=this.id_usuario;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarVehiculosPage');
  }

  agregar()
  {
    let info={};
    this.mysql.AgregarAuto(this.auto).subscribe(
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
     info={};
     this.mysql.Intermedia(this.auto).subscribe(
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
       this.navCtrl.setRoot(VehiculoPage,{id_usuario:this.id_usuario});
     },500);


    },3000);


  }


}
