import { ElementRef, Directive, Renderer2, Input, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {

    @HostBinding('class.tooltip-hover') private hovering: boolean;

    @Input('appTooltip') text;

    constructor(
        private readonly element: ElementRef,
        private readonly renderer: Renderer2) {
    }

    @HostListener('mouseover') onMouseOver() {
        this.renderer.setStyle(this.element.nativeElement, 'color', 'red');
        this.hovering = true;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.renderer.setStyle(this.element.nativeElement, 'color', 'blue');
        this.hovering = false;
    }

    ngOnInit(): void {
        console.log('text', this.text);
        console.log(this.element.nativeElement);
        this.renderer.setAttribute(this.element.nativeElement, 'title', this.text);
        this.renderer.addClass(this.element.nativeElement, 'has-tooltip');

    }
}
