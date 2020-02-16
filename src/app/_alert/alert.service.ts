import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              if (this.keepAfterRouteChange) {
                  // only keep for a single route change
                  this.keepAfterRouteChange = false;
              } else {
                  // clear alert messages
                  this.clear();
              }
          }
        });
    }

    // enable subscribing to alerts observable
    onAlert(alertId?: string): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
    }

    success(message: string, alertId?: string, timeout?: number) {
        this.alert(new Alert({ message, type: AlertType.Success, alertId }));
        if (timeout) {
          setTimeout(() => {
            this.clear(alertId);
          }, timeout);
        }
    }

    error(message: string, alertId?: string, timeout?: number) {
        this.alert(new Alert({ message, type: AlertType.Error, alertId }));
        if (timeout) {
          setTimeout(() => {
            this.clear(alertId);
          }, timeout);
        }
    }

    info(message: string, alertId?: string, timeout?: number) {
        this.alert(new Alert({ message, type: AlertType.Info, alertId }));
        if (timeout) {
          setTimeout(() => {
            this.clear(alertId);
          }, timeout);
        }
    }

    warn(message: string, alertId?: string, timeout?: number) {
        this.alert(new Alert({ message, type: AlertType.Warning, alertId }));
        if (timeout) {
          setTimeout(() => {
            this.clear(alertId);
          }, timeout);
        }
    }

    // main alert method
    alert(alert: Alert) {
        this.keepAfterRouteChange = alert.keepAfterRouteChange;
        this.subject.next(alert);
    }

    // clear alerts
    clear(alertId?: string) {
        this.subject.next(new Alert({ alertId }));
    }
}
