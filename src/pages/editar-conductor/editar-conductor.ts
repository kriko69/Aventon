import { ConductorPage } from './../conductor/conductor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { OpcionesConductorPage } from '../opciones-conductor/opciones-conductor';
import { ISubscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from '@angular/fire/database';
import { firebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario.interface';

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
  placa;
  control:ISubscription;
   constructor(public navCtrl: NavController, public navParams: NavParams, public servicio:firebaseService
    ,public alerta:AlertController, public database: AngularFireDatabase,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
      this.email = navParams.get('email');
      this.placa=navParams.get('placa');
      this.x=this.email.split('.');
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
      console.log(this.email);
    }
    actualizarPerfil(u:Usuario)//funcion para actializar el perfil
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
      this.navCtrl.setRoot(ConductorPage,{email:this.email,placa:this.placa}); //redirigir login
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
