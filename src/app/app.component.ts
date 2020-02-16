import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';

import {AuthService} from './auth/auth.service';

import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: any;
  currentUrl: any;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  showSideBar = true;

  ngOnInit(): void {
  }

  constructor(private authService: AuthService, location: Location, private router: Router,
              private idle: Idle, private keepalive: Keepalive) {


    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(60 * 60 * 3);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.logOut();
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();

    this.authService.currentUser.subscribe(user => this.currentUser = user);
    this.currentUrl = location.path();
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if ((val.url === '/auth' || val.url === '/auth/login' || val.url === '/') && !this.currentUser) {
          this.showSideBar = false;
        } else {
          this.showSideBar = true;
        }
      }

      this.currentUrl = location.path();

    });
  }

  getUser = () => {
    const userDetails = localStorage.getItem('currentUser');
    return userDetails;
  }

  isLoggedIn = () => {
    return this.getUser() ? true : false;
  }

  logOut = () => {
    this.authService.logout();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
