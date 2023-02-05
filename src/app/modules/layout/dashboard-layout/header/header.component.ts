import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/interfaces/menu-item.interface';
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
  menuItems: MenuItem[] = [
    { text: 'مشتری', link: 'customer/list', icon: '' },
    { text: 'پروژه ها', link: 'project/list', icon: '' },
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
