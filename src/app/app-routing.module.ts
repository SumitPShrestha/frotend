import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'categorytypes',
    loadChildren: () => import('./category-type/category-type.module').then(mod => mod.CategoryTypeModule)
  },
  {
    path: 'itemcategories',
    loadChildren: () => import('./item-category/item-category.module').then(mod => mod.ItemCategoryModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(mod => mod.ItemsModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./offers/offers.module').then(mod => mod.OffersModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('./tables/tables.module').then(mod => mod.TablesModule)
  },
  {
    path: 'dashboard',
    component: DashboardComponent
    // canActivate: [AuthGuard]

    // loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
