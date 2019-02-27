import { ConductorPage } from './../conductor/conductor';
import { VehiculoPage } from './../vehiculo/vehiculo';
import { Vehiculo } from './../../interfaces/vehiculo.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';
import { mysqlService } from '../../services/mysql.service';

import {FormGroup, FormBuilder, Validators} from '@angular/forms'; // Para la validacion del formulario
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';

/**
 * Generated class for the EditarVehiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-vehiculo',
  templateUrl: 'editar-vehiculo.html',
})
export class EditarVehiculoPage {

  auto:any;
  id_usuario;
  
  submitAttempt: boolean = false;
  myForm: FormGroup;

  fotoAuto: string;
  val: boolean=false;
  base64Image: string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public toast:ToastService,private platform:Platform,
  public mysql:mysqlService,public formBuilder: FormBuilder, public camera:Camera,
  private http: HttpClient) {
    this.platform.registerBackButtonAction(() => {
      console.log('');
    },10000);
    this.id_usuario=this.navParams.get('id_usuario');
    this.auto=this.navParams.get('auto');
    console.log(this.id_usuario);
    console.log('AUTO: '+this.auto.placa+' id: '+this.auto.id_auto);
    
    this.myForm = this.formBuilder.group({
      capacidad: [ this.auto.capacidad, Validators.compose([Validators.maxLength(1), Validators.required])],
      color:[this.auto.color,Validators.compose([Validators.required])],
      marca:[this.auto.marca,Validators.compose([Validators.required])],
      modelo:[ this.auto.modelo, Validators.compose([Validators.maxLength(4), Validators.required,Validators.minLength(4)])],
      placa: this.auto.placa,
      maletera: this.auto.maletera,
      });   

  }

  ionViewDidLoad() {
    this.fotoAuto = this.auto.placa;
    console.log("FOTO ");
      this.mysql.validarFotoAuto(this.auto.placa).subscribe(
        data=>{
          console.log(data);
          if(data['message']=="existe")
          {
            console.log("FOTO VALIDADA");
            this.fotoAuto = "http://181.114.114.160/aventon/img/Autos/"+this.fotoAuto + ".jpg";//data[placa] tiene que ser devuelta de la consulta
          }
          if(data['message']=="no existe")
          {
            console.log("FOTO  NO VALIDADA");
            this.fotoAuto = "http://181.114.114.160/aventon/img/defaultAuto.jpg";
          }
          this.base64Image=this.fotoAuto;
        },error=>{ 
        }
      );

  }

  actualizar()
  {
    this.auto.capacidad = this.myForm.value.capacidad;
    this.auto.color = this.myForm.value.color;
    this.auto.maletera = this.myForm.value.maletera;
    this.auto.marca = this.myForm.value.marca;
    this.auto.modelo = this.myForm.value.modelo;
    this.auto.maletera = this.myForm.value.maletera;
    let info={};
    this.mysql.UpdateAutos(this.auto).subscribe(
      data => {
        console.log('data', data);
        info= Object.assign(data);
        console.log('exito');
        }, (error: any)=> {
          console.log('error', error);
        }
    );
    setTimeout(()=>{
      if (info["message"]=='OK')
      {
        this.toast.show(` Vehiculo ${this.auto.marca} ${this.auto.placa} actualizado!`);
          this.navCtrl.setRoot(VehiculoPage,{id_usuario: this.id_usuario});
        console.log("se edito");
      }
    },1000);
  }

  eliminar()
  {
    this.mysql.EliminarAuto(Number(this.auto.id_auto)).subscribe(
      data => {
        console.log('data eliminar', data);
        }, (error: any)=> {
          console.log('error', error);
        }
    );
    this.toast.show(` Vehiculo ${this.auto.marca} ${this.auto.placa} eliminado!`);
        this.navCtrl.setRoot(VehiculoPage,{id_usuario: this.id_usuario});
      console.log("se elimino");
  }

  irConductor()
  {
    this.navCtrl.setRoot(ConductorPage,{id_usuario:this.id_usuario,id_auto:this.auto.id_auto});
  }
  

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
    this.fotoAuto = this.base64Image;
    this.val=true;
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
    this.fotoAuto = this.base64Image;
    this.val=true;
  },(err)=>{
    console.log('Error en la foto tomada')
  });
  }

  uploadingFoto(){
    if(this.val== true)
    {
      let url = 'http://181.114.114.160/aventon/img/Autos/subirfotosautos.php';
      let postData = new FormData();
      let nombre = this.auto.placa;
      postData.append('file',this.base64Image);
      postData.append('nombre',nombre)
      let data: Observable<any> = this.http.post(url,postData);
      data.subscribe((res)=>{
        console.log(res);
      });
  }
  }
}
