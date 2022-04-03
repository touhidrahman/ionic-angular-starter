import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHide]',
})
export class HideDirective {
    constructor(protected elementRef: ElementRef, protected renderer2: Renderer2) {}

    @Input() set appHide(value: boolean) {
        if (value) {
            this.renderer2.setStyle(this.elementRef.nativeElement, 'visibility', 'hidden');
        } else {
            this.renderer2.removeStyle(this.elementRef.nativeElement, 'visibility');
        }
    }
}
