import { Injectable } from "@angular/core";
import { ToastController } from 'ionic-angular';



@Injectable()
export class ToastService{
    constructor(private toast:ToastController)
    {

    }

    show(mensaje:string)
    {
        return this.toast.create({
            message: mensaje,
            duration:3000
        }).present();
    }

    solicitudes(cantidad)
    {
        return this.toast.create({
            message: 'Usted tiene '+cantidad+' solicitudes nuevas' ,
            position: 'top',
            duration:3000
        }).present();
    }
}