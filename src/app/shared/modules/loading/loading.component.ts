import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'koodaki-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  constructor() {}

  @Input() type?: 'snipper';

  ngOnInit(): void {}
}
