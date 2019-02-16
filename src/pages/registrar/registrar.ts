import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Usuario } from '../../interfaces/usuario.interface';
import { firebaseService } from '../../services/firebase.service';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

import {FormGroup, FormBuilder, Validators} from '@angular/forms'; // Para la validacion del formulario
/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { AngularFireAuth } from 'angularfire2/auth';

import { mysqlService } from '../../services/mysql.service';
import { pD } from '@angular/core/src/render3';

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
   , public mysql:mysqlService, public formBuilder: FormBuilder) {

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
    },3000);


  }

  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'Registrado exitoso!',
      subTitle: 'Ahora ya puedes ingresar a la aplicacion',
      buttons: ['OK']
    });
    alert.present();
  }
  selectedFile:File = null;

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  uploadingFoto(){
    const fd =new FormData();
    fd.append('image', this.selectedFile,this.selectedFile.name)
    this.http.post('http://181.114.114.160/aventon/img/Perfil',fd).subscribe(res=>{
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
