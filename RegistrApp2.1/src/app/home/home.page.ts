import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
  user: any;

  constructor(private animationCtrl: AnimationController, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.user)
      }else{this.router.navigate(["/login"])}
    });
  }

  segmentChanged($event){
    let direccion=$event.detail.value;
    console.log(direccion);
    this.router.navigate(['home/'+direccion]);
  }

}

