import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SliderPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider-principal',
  templateUrl: 'slider-principal.html',
})
export class SliderPrincipalPage {
  slides = [
    {
      title: "Bienvenido a Auto Compartido!",
      description: " <b>Comparte un viaje.",
      image: "assets/logo.png",
    },
    {
      title: "Que es Auto Compartido?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/logo.png",
    },
    {
      title: "Como comenzar?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/logo.png",
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  skip(){
    this.navCtrl.push(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPrincipalPage');
  }

}
