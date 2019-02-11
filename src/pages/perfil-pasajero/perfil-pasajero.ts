import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { VehiculoPage } from '../vehiculo/vehiculo';
import { firebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario.interface';

import { ISubscription } from 'rxjs/Subscription';
import { EditarPasajeroPage } from '../editar-pasajero/editar-pasajero';
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


  email='';
  tipo='';
  rama;
  value;
  data:Usuario={  };
  info:any;
  user=[];
  vehiculos=[];
  control:ISubscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,
    public servicio: firebaseService,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.email = navParams.get('email');
    this.rama = this.email.split('.');
    console.log('la rama: '+this.rama[0]);

    this.control = this.servicio.getUser(this.rama[0]).valueChanges().subscribe( // variable para agarrar la rama
      (datas)=>{
        console.log(datas);
        this.user=datas;
      },
      (error)=>{
        console.log('problems',error);
      }
    );

    setTimeout(
      ()=>{
        this.control.unsubscribe();
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
    nav.setRoot(EditarPasajeroPage,{email: this.email});//MODIFICADO PARA PASAR LOS PARAMETROS
  }


}
