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

import {FormGroup, FormBuilder, Validators} from '@angular/forms'; // Para la validacion del formulario
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
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
  fotoUsuario: string;
  base64Image: any='';
   constructor(public navCtrl: NavController, public navParams: NavParams, public servicio:firebaseService
    ,public alerta:AlertController, public database: AngularFireDatabase,private platform:Platform,
    public mysql:mysqlService,public toast:ToastService, public camera:Camera,
    private http: HttpClient,public formBuilder: FormBuilder) {
      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
      this.usuario = navParams.get('usuario');
    }

    ionViewDidLoad(){
      this.fotoUsuario = this.usuario.ci;
      this.mysql.validarFotoUsuario(this.fotoUsuario).subscribe(
        data=>{
          if(data['message']=="existe")
          {
            this.fotoUsuario = "http://192.168.0.107/aventon/img/Perfil/"+this.fotoUsuario + ".jpg";
          }
          if(data['message']=="no existe")
          {
            this.fotoUsuario = "http://192.168.0.107/aventon/img/defaultUsuario.jpg";
          }
          this.base64Image=this.fotoUsuario;
        },error=>{
          
        }
        
      );

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

  openCamera(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData)=> {
    this.base64Image = 'data:image/jpeg;base64,'+ imageData;
    this.fotoUsuario = this.base64Image;
  },(err)=>{
    console.log('Error en la foto tomada')
  });

  let url = 'http://192.168.0.107/aventon/img/Perfil/subirfotosperfil.php';
    let postData = new FormData();
    let nombre = this.usuario.ci;
    postData.append('file',this.base64Image);
    postData.append('nombre',nombre)
    let data: Observable<any> = this.http.post(url,postData);
    data.subscribe((res)=>{
      console.log(res);
    });
  
  }

  openGallery(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData)=> {
    this.base64Image = 'data:image/jpeg;base64,'+ imageData;
    this.fotoUsuario = this.base64Image;
  },(err)=>{
    console.log('Error en la foto tomada')
  });

  let url = 'http://192.168.0.107/aventon/img/Perfil/subirfotosperfil.php';
    let postData = new FormData();
    let nombre = this.usuario.ci;
    postData.append('file',this.base64Image);
    postData.append('nombre',nombre)
    let data: Observable<any> = this.http.post(url,postData);
    data.subscribe((res)=>{
      console.log(res);
    });
  }
}
