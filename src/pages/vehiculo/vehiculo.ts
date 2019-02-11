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

@IonicPage()
@Component({
  selector: 'page-vehiculo',
  templateUrl: 'vehiculo.html',
})
export class VehiculoPage {

  vehiculos$=[];
  value;
  email='';
  aux;
  rama;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email=navParams.get('email');
    this.aux=this.email.split('.');
    this.rama=this.aux[0];
    this.servicio.getAutosRef(this.rama).valueChanges().subscribe(
      (datas)=>{
        console.log("datas",datas);
        //si quiero filtrar por modelo==2010
        /*for(this.value of datas)
        {
          if(this.value.modelo==2010)
          {
            this.vehiculos$.push(this.value);
          }
        }*/
        this.vehiculos$=datas;
      },
      (error) =>{
        console.log("problems",error);
        
      }
    );
    //las keys
    this.servicio.getAutosRef(this.rama).snapshotChanges().subscribe(
      info=>{
        for(let i=0;i<info.length;i++)
        {
          console.log(info[i].key);
          
        }
        
      }
    );
    
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiculoPage');
  }

  irAgregar()
  {
    this.navCtrl.push(AgregarVehiculosPage,{email:this.email});
    
  }

  irEditar(auto:Vehiculo)
  {
    this.navCtrl.push(EditarVehiculoPage,{auto:auto,email:this.email});
  }
}
