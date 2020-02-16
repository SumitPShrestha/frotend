import { DataTablesModule } from 'angular-datatables';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AlertModuleCustom } from './_alert';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CategoryTypeModule } from './category-type/category-type.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ItemCategoryModule } from './item-category/item-category.module';
import { ItemsModule } from './items/items.module';
import { OffersModule } from './offers/offers.module';
import { OrdersModule } from './orders/orders.module';
import { metaReducers, reducers } from './reducers';
import { TablesModule } from './tables/tables.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    UsersModule,
    AlertModuleCustom,
    CategoryTypeModule,
    ItemCategoryModule,
    ItemsModule,
    ModalModule.forRoot(),
    FontAwesomeModule,
    DataTablesModule,
    OffersModule,
    OrdersModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    TablesModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
