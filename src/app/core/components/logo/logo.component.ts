import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  static Small_Icon = 'smallIcon';

  @Input()
  type: string;

  cssClass = 'login';

  constructor() { }

  ngOnInit() {
    this.type = this.type ? this.type : '';

    if (this.type === LogoComponent.Small_Icon) {
      this.cssClass = 'small-icon';
    }

  }

}
