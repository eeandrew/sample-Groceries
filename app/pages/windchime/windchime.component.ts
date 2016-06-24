import {
  Color
} from 'color';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  Label
} from 'ui/label';
import {
  AbsoluteLayout
} from 'ui/layouts/absolute-layout';
import * as animationsModule from 'ui/animation';
import { PanGestureEventData, GestureTypes, GestureEventData, TouchGestureEventData } from 'ui/gestures';

interface IRings {
  color: Color
}

@Component({
  selector: 'wind-chime',
  template: `
    <AbsoluteLayout #windchime width="100%" height="100%" (touch)="touch($event)">
    </AbsoluteLayout>
  `
})

export class WindchimeComponent implements AfterViewInit{
  @ViewChild('windchime') windchime: ElementRef;
  private layout : AbsoluteLayout;
  public x: any;
  public y: any;
  public chime: any;

  private rings: IRings[] = [
    {color: new Color('#FF3D7F')},
    {color: new Color('#FF9E9D')},
    {color: new Color('#DAD8A7')}
  ];

  private createCircle(layout: AbsoluteLayout, x: number, y: number, ringColor: Color) {
    let circle: Label = new Label;
    let hole: Label = new Label;
    circle.height = 200;
    circle.width = 200;
    circle.borderRadius = 100;
    circle.backgroundColor = ringColor;

    hole.height = 40;
    hole.width = 40;
    hole.borderRadius = 20;
    hole.backgroundColor = new Color('#000');
    hole.opacity = 0.7;

    layout.addChild(circle);
    layout.addChild(hole);

    y = y - 100;
    x = x - 100;
    AbsoluteLayout.setTop(circle,y);
    AbsoluteLayout.setLeft(circle,x);

    AbsoluteLayout.setTop(hole,y + 80);
    AbsoluteLayout.setLeft(hole,x + 80);
    while (layout.getChildrenCount() > 30) {
        layout.removeChild(layout.getChildAt(0));
    }
     this.animateCircle(circle, hole, ringColor);
  }

  private animateCircle(cirle: Label, hole: Label,ringColor: Color) {
    let definations = new Array();
    definations.push({
      target: cirle,
      scale: {x:20,y:20},
      opacity: 0.1,
      duration: 3700
    });
    definations.push({
      target: hole,
      scale: {x:20,y:20},
      opacity: 0.1,
      duration: 3700
    });
    let animations = new animationsModule.Animation(definations, false);
    animations.play().then(function () {
        }).then(() => {
            this.layout.removeChild(hole);
            this.layout.removeChild(cirle);
        });
  }

  playChime() {
        let randomChime = this.rings[Math.floor(Math.random() * this.rings.length)];
        this.createCircle(this.layout, this.x, this.y, randomChime.color);
    }

  ngAfterViewInit() {
    this.layout = <AbsoluteLayout> this.windchime.nativeElement;
  }

  public touch(e: TouchGestureEventData) {
        if (e && e.action === 'down') {
            this.x = e.getX();
            this.y = e.getY();
            this.playChime();
        }
    }
}