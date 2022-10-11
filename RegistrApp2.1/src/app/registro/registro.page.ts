import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BdLocalService } from '../services/bd-local.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  NombreU: string;
  password: string;
  correo: string;
  formularioRegistro: FormGroup;

  constructor(private router: Router,public fb: FormBuilder, private bdLocal: BdLocalService, public toastController: ToastController) {
    this.formularioRegistro = this.fb.group({
      NombreU : new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required)

    });
  }

  volver(){
    this.router.navigate(['/principal']);
  }

  async guardar(){
    const f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid){
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const toast = await this.toastController.create({
        message: 'Todos los campos deben estar llenos',
        duration: 5000
      });
      toast.present();
      return;
    }

    const usuario = {
      NombreU: f.NombreU,
      password: f.password,
      correo: f.correo
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    const toast = await this.toastController.create({
      message: 'Se ha registrado la cuenta correctamente',
      duration: 5000
    });
    toast.present();
  }


  ngOnInit() {
  }

}


 
