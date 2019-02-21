import { ConfirmarEliminacionPage } from './../confirmar-eliminacion/confirmar-eliminacion';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, ToastController, Platform } from 'ionic-angular';
import { ISubscription } from 'rxjs/Subscription';
import { RutaModel } from '../../shared/ruta-model';
import { firebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';
import { OpcionesConductorPage } from '../opciones-conductor/opciones-conductor';
import { mysqlService } from '../../services/mysql.service';

/**
 * Generated class for the MisRutasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-rutas',
  templateUrl: 'mis-rutas.html',
})
export class MisRutasPage {

  id_usuario;
  vec:any=[];
  id_auto;
  control1:ISubscription;
  public viajes:RutaModel[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public mysql:mysqlService,
    public viewCtrl:ViewController,public alertCtrl : AlertController, public toast: ToastService,private platform:Platform) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    this.id_usuario = this.navParams.get('id_usuario');
    this.id_auto = this.navParams.get('id_auto');

    this.func();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViajePage');
  }
  func(){
    this.mysql.listarRutasParaEliminar(this.id_usuario).subscribe(
      data=>{
        console.log('nombre rutas: ',data);
        this.vec=data;
        console.log('vec',this.vec);

      },(error)=>{
        console.log(error);

      }
    );
  }
  rama;
  borrarRuta(nombre_ruta:any,id_ruta){
            this.navCtrl.setRoot(ConfirmarEliminacionPage,{id_usuario:this.id_usuario,id_auto:this.id_auto,nombre_ruta:nombre_ruta,id_ruta:id_ruta});

 }

}
