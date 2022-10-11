/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle uwu */
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { IAgenda } from '../interfaces/iagenda';


@Injectable({
  providedIn: 'root'
})
export class BdLocalService {

agenda: IAgenda[]=[];
  private _storage: Storage | null = null;

  constructor(private storage: Storage, public toastController: ToastController) {
    this.init();
    this.cargarContectos();
  }
  async cargarContectos() {
    const miAgenda= await this.storage.get('agenda');
    if (miAgenda){
      this.agenda=miAgenda;
    }
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
  }
  guardarContactos(NombreU: string,password: string,correo: string){
    const existe= this.agenda.find(c=>c.strNombre===NombreU);
    if (!existe){
      this.agenda.unshift({strNombre:NombreU, strPassword:password, strCorreo:correo});
      this._storage.set('agenda',this.agenda);
      this.presentToast('Su Usuario se ha registrado correctamente');

    }else{
      this.presentToast('Error: El usuario ya existe');
      // eslint-disable-next-line no-trailing-spaces
    }
  }
  async presentToast(mensaje: string) {

    const toast = await this.toastController.create({

      message: mensaje,

      translucent:true,

      color:'medium',

      position: 'top',

      duration: 2000

    });

    toast.present();

  }
}
