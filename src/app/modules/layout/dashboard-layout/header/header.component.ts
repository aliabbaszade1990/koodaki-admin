import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  avatar: string;
  dropdownOpen = false;
  dropdownX: number;
  dropdownY: number;
  menuItems = [
    { label: 'مشتری', route: 'customer/list' },
    { label: 'پروژه ها', route: 'project/list' },
  ];

  @ViewChild('userAccount', { static: true }) userAccount: ElementRef;
  @ViewChild('dropdown') dropdown: ElementRef;

  constructor() {}

  ngOnInit() {}

  toggleDropdown() {
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