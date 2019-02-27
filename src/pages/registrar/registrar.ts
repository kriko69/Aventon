import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Usuario } from '../../interfaces/usuario.interface';
import { firebaseService } from '../../services/firebase.service';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

import {FormGroup, FormBuilder, Validators} from '@angular/forms'; // Para la validacion del formulario
import { Camera, CameraOptions } from '@ionic-native/camera'; //Para la camara
/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { AngularFireAuth } from 'angularfire2/auth';

import { mysqlService } from '../../services/mysql.service';
import { pD } from '@angular/core/src/render3';
import { Subscription, Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {


  dataMYSQL={
    carnet:0,
    nombre:'',
    apellido:'',
    pass1:'',
    fecha_nac:'',
    tipo:'',
    telf:0,
    calif_pasa:0,
    calif_cond:0
  };

  submitAttempt: boolean = false;
  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public servicio:firebaseService
  ,public alerta:AlertController,private afAauth:AngularFireAuth,private platform:Platform, private http: HttpClient
   , public mysql:mysqlService, public formBuilder: FormBuilder, public camera:Camera) {

      this.platform.registerBackButtonAction(() => {
        console.log('');
      },10000);
    
      this.myForm = this.formBuilder.group({
        nombre: ['', Validators.compose([Validators.maxLength(20),Validators.required])],
        apellido: ['', Validators.compose([Validators.maxLength(25),Validators.required])],
        carnet: [0, Validators.compose([Validators.maxLength(10), Validators.required])],
        fecha_nac: ['', Validators.compose([ Validators.required])],
        //p_email: ['', Validators.compose([Validators.required])],
        //password_ctrl: this.formBuilder.group({
        pass1: ['', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
        tipo:'',
        confirm_password: ['', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
        telf: [ 0, Validators.compose([Validators.maxLength(8), Validators.required])]
        //}, this.matchPassword)
      }, {'validator': this.matchingPasswords('pass1', 'confirm_password')});

  }

  
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirm_password = group.controls[confirmPasswordKey];

      if (password.value !== confirm_password.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  /*ionViewDidLoad(){
    this.servicio.getId();
  }*/


  registrar()
  {
    this.dataMYSQL.nombre = this.myForm.value.nombre;
    this.dataMYSQL.apellido = this.myForm.value.apellido;
    this.dataMYSQL.carnet = this.myForm.value.carnet;
    this.dataMYSQL.fecha_nac = this.myForm.value.fecha_nac;
    this.dataMYSQL.pass1 = this.myForm.value.pass1;
    this.dataMYSQL.telf = this.myForm.value.telf;
    console.log(this.dataMYSQL);
    let info={};
    
    this.mysql.AgregarUsuario(this.dataMYSQL).subscribe(
      data => {
        console.log('data', data);
        info= Object.assign(data);
        console.log('exito');


        }, (error: any)=> {
          console.log('error', error);
          console.log();

        }
    );

    setTimeout(()=>{
      console.log('info',info);
      this.mostrarAlerta();
      this.navCtrl.push(LoginPage);
    },1000);


  }

  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'Registrado exitoso!',
      subTitle: 'Ahora ya puedes ingresar a la aplicacion',
      buttons: ['OK']
    });
    alert.present();
  }
  base64Image: any='../assets/defaultUsuario.jpg';
  openCamera(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
    }

    this.camera.getPicture(options).then((imageData)=> {
    this.base64Image = 'data:image/jpeg;base64,'+ imageData;
  },(err)=>{
    console.log('Error en la foto tomada')
  });
  
  }

  openGallery(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    }

    this.camera.getPicture(options).then((imageData)=> {
    this.base64Image = 'data:image/jpeg;base64,'+ imageData;
  },(err)=>{
    console.log('Error en la foto tomada')
  });
  }

  uploadingFoto(){
    let url = 'http://181.114.114.160/aventon/img/Perfil/subirfotosperfil.php';
    let postData = new FormData();
    let nombre = this.myForm.value.carnet;
    postData.append('file',this.base64Image);
    postData.append('nombre',nombre)
    let data: Observable<any> = this.http.post(url,postData);
    data.subscribe((res)=>{
      console.log(res);
    });
  }
  dameFecha()
  {
    let hoy = new Date();
    let dd = hoy.getDate();
    let mm = hoy.getMonth()+1;
    let yyyy = hoy.getFullYear();
    let date=yyyy+'-'+mm+'-'+dd;

    return date;
  }
}
