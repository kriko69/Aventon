import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { OpcionesPasajeroPage } from '../opciones-pasajero/opciones-pasajero';
import { AngularFireDatabase } from '@angular/fire/database';
import { Usuario } from '../../interfaces/usuario.interface';
import { ISubscription } from 'rxjs/Subscription';
import { firebaseService } from '../../services/firebase.service';
import { PasajeroPage } from '../pasajero/pasajero';
import { mysqlService } from '../../services/mysql.service';
import { ToastService } from '../../services/toast.service';

/**
 * Generated class for the EditarPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-pasajero',
  templateUrl: 'editar-pasajero.html',
})
export class EditarPasajeroPage {
  usuario;
  control:ISubscription;
   constructor(public navCtrl: NavController, public navParams: NavParams, public servicio:firebaseService
    ,public alerta:AlertController, public database: AngularFireDatabase,private platform:Platform,
    public mysql:mysqlService,public toast:ToastService) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
      this.usuario = navParams.get('usuario');
    }

    ionViewDidLoad(){
    }

    actualizarPerfil(user)//funcion para actializar el perfil
      {
        let info={};
    this.mysql.EditarUser(this.usuario).subscribe(
      data => {
        console.log('data', data);
        info= Object.assign(data);
        console.log('exito');
        }, (error: any)=> {
          console.log('error', error);
        }
    );
    setTimeout(()=>{
        this.mostrarAlerta(); //alerta
        this.navCtrl.setRoot(PasajeroPage,{id_usuario:this.usuario.ci}); //redirigir login
      
    },1000);
    }



    mostrarAlerta() {
      const alert = this.alerta.create({
        title: 'Datos actualizados!',
        subTitle: 'Continue navegando',
        buttons: ['OK']
      });
      alert.present();
    }

}
