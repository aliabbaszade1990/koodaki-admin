import { Component } from '@angular/core';

@Component({
  selector: 'koodaki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  date: Date;

  constructor() {}
  title = 'koodaki-admin';
}
