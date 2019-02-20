import { ConductorPage } from './../conductor/conductor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { OpcionesConductorPage } from '../opciones-conductor/opciones-conductor';
import { ISubscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from '@angular/fire/database';
import { firebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { mysqlService } from '../../services/mysql.service';

/**
 * Generated class for the EditarConductorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-conductor',
  templateUrl: 'editar-conductor.html',
})
export class EditarConductorPage {
  usuario;
  control:ISubscription;
  id_auto;
   constructor(public navCtrl: NavController, public navParams: NavParams, public servicio:firebaseService
    ,public alerta:AlertController, public database: AngularFireDatabase,private platform:Platform,
    public mysql:mysqlService) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
      this.usuario = navParams.get('usuario');
      this.id_auto=navParams.get('id_auto');
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
      this.navCtrl.setRoot(ConductorPage,{id_usuario:this.usuario.ci,id_auto:this.id_auto}); //redirigir login
    
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
