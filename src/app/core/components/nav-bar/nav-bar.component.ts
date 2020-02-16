import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  @Input()
  isLoggedIn: boolean;
  constructor() { }

  ngOnInit() {
    console.log('InisLogged', this.isLoggedIn)
    ;
  }

}
