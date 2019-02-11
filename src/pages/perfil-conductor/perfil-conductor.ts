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

@IonicPage()
@Component({
  selector: 'page-perfil-conductor',
  templateUrl: 'perfil-conductor.html',
})
export class PerfilConductorPage {

  email='';
  tipo='';
  rama;
  value;
  placa;
  data:Usuario={  };
  info:any;
  user=[];
  vehiculos=[];
  controlP:ISubscription;
  controlV:ISubscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public servicio: firebaseService, public app:App,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.email = navParams.get('email');
    this.placa=navParams.get('placa');
    this.rama = this.email.split('.');
    console.log(this.rama[0]);

    this.controlP = this.servicio.getUser(this.rama[0]).valueChanges().subscribe( // variable para agarrar la rama
      (datas)=>{
        console.log(datas);
        this.user=datas;
      },
      (error)=>{
        console.log('problems',error);
      }
    );

    this.controlV = this.servicio.getAutosRef(this.rama).valueChanges().subscribe(
      (datas)=>{
        console.log("datas",datas);
        //si quiero filtrar por modelo==2010
        for(this.value of datas)
        {
          if(this.value.email==this.email)
          {
            this.vehiculos.push(this.value);
          }
        }
      },
      (error) =>{
        console.log("problems",error);

      }
    );

    setTimeout(
      ()=>{
        this.controlP.unsubscribe();
        this.controlV.unsubscribe();
      },3000
    );
  }

  ionViewDidLoad() {
    console.log(this.email);
  }
  editPerfil()
  {

    let aux= this.email.split('.');
    this.data.correo = this.email;
    var nav = this.app.getRootNav();
    nav.setRoot(EditarConductorPage,{email: this.email,placa:this.placa});//MODIFICADO PARA PASAR LOS PARAMETROS
  }

  verVehiculo()
  {
    var nav = this.app.getRootNav();
    nav.push(VehiculoPage,{email:this.email});

  }

}
