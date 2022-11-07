import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})

export class BorderCardDirective {
  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;

  constructor(private elem : ElementRef) { 
    this.setHeight(this.defaultHeight);
    this.setBorder(this.defaultColor);
  }

  @Input('pkmnBorderCard') borderColor: string;

  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);
  }
  
  private setHeight(height: number){
    this.elem.nativeElement.style.height = `${height}px`;
  }

  private setBorder(color: string){
    this.elem.nativeElement.style.border = `solid 4x ${color}`;
  }

}
