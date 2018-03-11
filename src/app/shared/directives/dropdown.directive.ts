import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  private timer;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseover') onMouseOver() {
    clearTimeout(this.timer);
    this.isOpen = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.timer = setTimeout(() => {
      this.isOpen = false;
    }, 1000)
  }
}
