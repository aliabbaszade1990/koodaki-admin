import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { MenuItem } from 'src/app/shared/interfaces/menu-item.interface';
@Component({
  selector: 'koodaki-header',
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
    { text: 'مشتری ها', link: 'customer/list', icon: 'group' },
    { text: 'پروژه ها', link: 'project/list', icon: 'photo-library' },
  ];

  constructor(private authService: AuthService) {}

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
  logout() {
    this.authService.logout();
  }
}
