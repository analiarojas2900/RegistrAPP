import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ElementRef, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  @ViewChild('square1', { read: ElementRef, static: true }) square1: ElementRef;

  ngAfterViewInit() {
  const square1 = this.animationCtrl.create()
  .addElement(this.square1.nativeElement)
  .keyframes([
    { offset: 0, transform: 'scale(1))', opacity: '1' },
    { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
    { offset: 1, transform: 'scale(1)', opacity: '1' }
  ]);

  const parent = this.animationCtrl.create()
  .duration(2000)
  .iterations(Infinity)
  .addAnimation([square1]);

  square1.play()
}

  correo = {
    correo: ""
  }

  field: string = ""
  constructor(private animationCtrl: AnimationController, private router: Router, public toastController: ToastController) { } 

  ngOnInit() {
  }

ingresar() {
  if (this.validateModel(this.correo)) {
    this.presentToast("Correo enviado")
  
    let navigationExtras: NavigationExtras = {
      state: {
        correo: this.correo 
      }
    };
    this.router.navigate(['/login'], navigationExtras); 
  }
  else{
    this.presentToast("Falta ingresar "+this.field,5000)
  }
}

validateModel(model: any) {
  
  for (var [correo, value] of Object.entries(model)) {
    
    if (value == "") {
      this.field = correo;
      return false;
    }
  }
  return true;
}

async presentToast(msg: string, duracion?: number) {
  const toast = await this.toastController.create({
    message: msg,
    duration: duracion ? duracion : 2000
  });
  toast.present();
}
}