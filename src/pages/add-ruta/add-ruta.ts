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
  email='';
  vec:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public servicio:firebaseService,
    public viewCtrl:ViewController,private platform:Platform) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.email = this.navParams.get('datos');
  }

  ionViewDidLoad() {
    console.log(this.email);
    this.func();
  }
  func(){
    this.vec=this.servicio.getRuta(this.email);
  }
  submit(puntos:any){
    this.viewCtrl.dismiss(puntos);
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
