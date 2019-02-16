import { mysqlService } from './../../services/mysql.service';
import { firebaseService } from './../../services/firebase.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the AddRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-ruta',
  templateUrl: 'add-ruta.html',
})
export class AddRutaPage {
  id_usuario='';
  vec:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public mysql:mysqlService,
    public viewCtrl:ViewController,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario = this.navParams.get('id_usuario');


  }

  ionViewDidLoad() {
    console.log('id_usuario para rutas '+this.id_usuario);
    this.func();
  }
  func(){
    //listar rutas
    this.mysql.listarRutas(this.id_usuario).subscribe(
      data=>{
        console.log('nombre rutas: ',data);
        this.vec=data;
        console.log('vec',this.vec);

      },(error)=>{
        console.log(error);

      }
    );
  }
  submit(numbre_ruta){
    let puntos;
    this.mysql.obtenerPuntosDeRuta(numbre_ruta,this.id_usuario).subscribe(
      data=>{
        console.log('puntos rutas: ',data);
        puntos=data;
      },(error)=>{
        console.log(error);
      }
    );
    setTimeout(()=>{
      console.log('puntos',puntos);

      this.viewCtrl.dismiss(puntos);
    },1000);
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
