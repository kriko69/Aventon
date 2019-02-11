import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { OpcionesPasajeroPage } from '../opciones-pasajero/opciones-pasajero';
import { AngularFireDatabase } from '@angular/fire/database';
import { Usuario } from '../../interfaces/usuario.interface';
import { ISubscription } from 'rxjs/Subscription';
import { firebaseService } from '../../services/firebase.service';
import { PasajeroPage } from '../pasajero/pasajero';

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
  data:Usuario={
    carnet:0,
    nombre:'',
    apellido:''
  };
  email='';
  nombre='';
  x;
  lista;
  user=[];
  info:any;
  control:ISubscription;
   constructor(public navCtrl: NavController, public navParams: NavParams, public servicio:firebaseService
    ,public alerta:AlertController, public database: AngularFireDatabase,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
      this.email = navParams.get('email');
      this.x=this.email.split('.');
      console.log(this.x[0]);

      //this.servicio.definirUsusarioRef(); //defino nombre de rama

      this.control = this.servicio.getUser(this.x[0]).valueChanges().subscribe( // variable para agarrar la rama
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

    ionViewDidLoad(){
    }

    actualizarPerfil(user)//funcion para actializar el perfil
      {
        let aux= this.email.split('.');
      console.log(aux[0]);
       this.data.nombre=this.user[9];
       this.data.apellido=this.user[0];
       this.data.carnet=this.user[3];
       this.servicio.editPerfil(this.data,aux[0]).then(ref=>{ //agrego
        //si se tiene exito
        this.user=[];
        this.mostrarAlerta(); //alerta
        this.navCtrl.setRoot(PasajeroPage,{email:this.email}); //redirigir login
      });

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
