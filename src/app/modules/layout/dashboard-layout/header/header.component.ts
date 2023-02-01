import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(document:click)': 'clickToCloseDropdownAnyWhere($event)',
  },
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

  constructor() {}

  ngOnInit() {}

  clickToCloseDropdownAnyWhere() {
    this.dropdownOpen = false;
  }

  toggleDropdown(event: Event) {
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
    event.stopPropagation();
  }
}
