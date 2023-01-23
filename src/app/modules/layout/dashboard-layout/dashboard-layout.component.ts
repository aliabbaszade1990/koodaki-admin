import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent {
  avatar: string;
  panelOpenState = false;
  dropdownOpen = false;
  clickedX: number;
  clickedY: number;
  dropdownX: number;
  dropdownY: number;

  @ViewChild('userAccount', { static: true }) userAccount: ElementRef;
  @ViewChild('dropdown') dropdown: ElementRef;

  constructor(private renderer: Renderer2) {}

  // toggleDropdown(event: any) {
  //   this.dropdownOpen = !this.dropdownOpen;
  //   if (this.dropdownOpen) {
  //     let dropdown = document.querySelector('.dropdown');
  //     if (dropdown) {
  //       this.renderer.setStyle(dropdown, 'top', event.clientY + 'px');
  //       this.renderer.setStyle(dropdown, 'left', event.clientX + 'px');
  //     }
  //   }
  // }
  // toggleDropdown(event: any) {
  //   this.dropdownOpen = !this.dropdownOpen;
  //   if (this.dropdownOpen) {
  //     let dropdown = document.querySelector('.dropdown');
  //     if (dropdown) {
  //       dropdown.classList.add('dropdown-down');
  //     }
  //   } else {
  //     let dropdown = document.querySelector('.dropdown');
  //     if (dropdown) {
  //       dropdown.classList.remove('dropdown-down');
  //     }
  //   }
  // }
  toggleDropdown(event: any) {
    this.dropdownOpen = !this.dropdownOpen;
    setTimeout(() => {
      let dropdown = document.querySelector('.dropdown');
      if (dropdown) {
        if (this.dropdownOpen) {
          dropdown.classList.add('dropdown-down');
        } else {
          dropdown.classList.remove('dropdown-down');
        }
      }
    }, 0);
  }
}
