import { Component } from '@angular/core';

@Component({
  selector: 'koodaki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  date: Date;

  constructor() {
    let today = new Date().toLocaleDateString('fa-IR');
    console.log('today', today);

    // this.date = new Date();
    // const dt = DateTime.local(2017, 5, 15, 8, 30);
    // console.log('1', dt.toFormat('yyyy mm dd'));
    // console.log('2', DateTime.fromISO('2017-05-15'));
    // const d = DateTime.now();
    // console.log('3', d.zoneName);
    // console.log('4', dt.toLocaleString(DateTime.DATETIME_MED));
    // console.log('4', dt.toISO());
    // console.log('last', DateTime.now().toString());

    //     var dt = DateTime.now();
    // var f = {month: 'long', day: 'numeric'};
    // dt.setLocale('fr').toLocaleString(f)      //=> '14 septembre'
    // dt.setLocale('en-GB').toLocaleString(f)   //=> '14 September'
    // dt.setLocale('en-US').toLocaleString(f)
  }
  title = 'koodaki-admin';
}
