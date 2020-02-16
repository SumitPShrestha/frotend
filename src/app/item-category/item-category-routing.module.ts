import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemCategoryListComponent} from './item-category-list/item-category-list.component';

const routes: Routes = [
  {
    path: 'all',
    component: ItemCategoryListComponent
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemCategoryRoutingModule { }
