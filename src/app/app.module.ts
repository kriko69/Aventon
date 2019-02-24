import { mysqlService } from './../services/mysql.service';
import { ActivarRutaPage } from './../pages/activar-ruta/activar-ruta';
import { OpcionReservaPage } from './../pages/opcion-reserva/opcion-reserva';
import { VerRutaDesdePasajeroPage } from './../pages/ver-ruta-desde-pasajero/ver-ruta-desde-pasajero';
import { ConfirmarllevadaPage } from './../pages/confirmarllevada/confirmarllevada';
import { ConfirmarEliminacionPage } from './../pages/confirmar-eliminacion/confirmar-eliminacion';
import { MisRutasPage } from './../pages/mis-rutas/mis-rutas';
import { AceptarSolicitudPage } from './../pages/aceptar-solicitud/aceptar-solicitud';
import { PuntoRecogidaReservaPage } from './../pages/punto-recogida-reserva/punto-recogida-reserva';
import { PuntoRecogidaPage } from './../pages/punto-recogida/punto-recogida';
import { EditarConductorPage } from './../pages/editar-conductor/editar-conductor';
import { EditarPasajeroPage } from './../pages/editar-pasajero/editar-pasajero';
import { PerfilPasajeroPage } from './../pages/perfil-pasajero/perfil-pasajero';
import { OpcionesConductorPage } from './../pages/opciones-conductor/opciones-conductor';
import { VerProgramadasPasajeroPage } from './../pages/ver-programadas-pasajero/ver-programadas-pasajero';
import { UbicacionService } from './../providers/ubicacion/ubicacion';
import { VerMiRutaPage } from './../pages/ver-mi-ruta/ver-mi-ruta';
import { BuzonPasajeroPage } from './../pages/buzon-pasajero/buzon-pasajero';
import { BuzonPage } from './../pages/buzon/buzon';
import { EditarVehiculoPage } from './../pages/editar-vehiculo/editar-vehiculo';
import { AgregarVehiculosPage } from './../pages/agregar-vehiculos/agregar-vehiculos';
import { AddrutaproPage } from './../pages/addrutapro/addrutapro';
import { ReservaPasajeroPage } from './../pages/reserva-pasajero/reserva-pasajero';
import { HomePasajeroPage } from './../pages/home-pasajero/home-pasajero';
import { PasajeroPage } from './../pages/pasajero/pasajero';
import { firebaseService } from './../services/firebase.service';
import { ConductorPage } from './../pages/conductor/conductor';
import { VehiculoPage } from './../pages/vehiculo/vehiculo';
import { RegistrarPage } from './../pages/registrar/registrar';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ViajePage } from '../pages/viaje/viaje';
import { MarkadorPage } from '../pages/markador/markador';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CREDENTIALS } from './firebase.credentians';
import { AngularFireAuthModule } from 'angularfire2/auth';



import { Ionic2RatingModule } from 'ionic2-rating';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import {AddRutaPage} from '../pages/add-ruta/add-ruta';
import { LoginPage } from '../pages/login/login';
import { TipoUsuarioPage } from '../pages/tipo-usuario/tipo-usuario';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ToastService } from '../services/toast.service';
import { OpcionesPasajeroPage } from '../pages/opciones-pasajero/opciones-pasajero';
import { ReservarProgramadasPasajeroPage } from '../pages/reservar-programadas-pasajero/reservar-programadas-pasajero';
import { PerfilConductorPage } from '../pages/perfil-conductor/perfil-conductor';
import { PruebaPage } from '../pages/prueba/prueba';
import { HomePage } from '../pages/home/home';
import { CalificacionPage } from '../pages/calificacion/calificacion';
import { VerMiQrPage } from '../pages/ver-mi-qr/ver-mi-qr';
import { EsPasajeroPage } from '../pages/es-pasajero/es-pasajero';
import { VestimentaPage } from '../pages/vestimenta/vestimenta';
import { Vestimenta1Page } from '../pages/vestimenta1/vestimenta1';

import { SliderPrincipalPage } from './../pages/slider-principal/slider-principal';
import { SlidePasajeroPage } from './../pages/slide-pasajero/slide-pasajero';
import { SlideConductorPage } from './../pages/slide-conductor/slide-conductor';
import { HttpClientModule } from '@angular/common/http';
import { Camera} from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    CalificacionPage,
    HomePage,
    MarkadorPage,
    ViajePage,
    AddRutaPage,
    LoginPage,
    RegistrarPage,
    TipoUsuarioPage,
    VehiculoPage,
    ConductorPage,
    PasajeroPage,
    HomePasajeroPage,
    ReservaPasajeroPage,
    AddrutaproPage,
    AgregarVehiculosPage,
    EditarVehiculoPage,
    BuzonPage,
    BuzonPasajeroPage,
    OpcionesPasajeroPage,
    VerMiRutaPage,
    VerProgramadasPasajeroPage,
    ReservarProgramadasPasajeroPage,
    OpcionesConductorPage,
    PerfilConductorPage,
    PerfilPasajeroPage,
    EditarPasajeroPage,
    EditarConductorPage,
    PuntoRecogidaPage,
    PuntoRecogidaReservaPage,
    AceptarSolicitudPage,
    MisRutasPage,
    ConfirmarEliminacionPage,
    ConfirmarllevadaPage,
    VerRutaDesdePasajeroPage,
    OpcionReservaPage,
    ActivarRutaPage,
    PruebaPage,
    VerMiQrPage,
    EsPasajeroPage,
    VestimentaPage,
    Vestimenta1Page,
    SliderPrincipalPage,
    SlidePasajeroPage,
    SlideConductorPage
  ],
  imports: [
    BrowserModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxQRCodeModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalificacionPage,
    HomePage,
    MarkadorPage,
    ViajePage,
    AddRutaPage,
    LoginPage,
    RegistrarPage,
    TipoUsuarioPage,
    VehiculoPage,
    ConductorPage,
    PasajeroPage,
    HomePasajeroPage,
    ReservaPasajeroPage,
    AddrutaproPage,
    AgregarVehiculosPage,
    EditarVehiculoPage,
    BuzonPage,
    BuzonPasajeroPage,
    OpcionesPasajeroPage,
    VerMiRutaPage,
    VerProgramadasPasajeroPage,
    ReservarProgramadasPasajeroPage,
    OpcionesConductorPage,
    PerfilConductorPage,
    PerfilPasajeroPage,
    EditarPasajeroPage,
    EditarConductorPage,
    PuntoRecogidaPage,
    PuntoRecogidaReservaPage,
    AceptarSolicitudPage,
    MisRutasPage,
    ConfirmarEliminacionPage,
    ConfirmarllevadaPage,
    VerRutaDesdePasajeroPage,
    OpcionReservaPage,
    ActivarRutaPage,
    PruebaPage,
    VerMiQrPage,
    EsPasajeroPage,
    VestimentaPage,
    Vestimenta1Page,
    SliderPrincipalPage,
    SlidePasajeroPage,
    SlideConductorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    firebaseService,
    mysqlService,
    ToastService,
    UbicacionService,
    BarcodeScanner,
    Camera

  ]
})
export class AppModule {}
