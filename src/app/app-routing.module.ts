import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarBrandComponent } from './car-brand/car-brand.component';
import { CarModelListComponent } from './car-model-list/car-model-list.component';
import { CarModelComponent } from './car-model/car-model.component';

const routes: Routes = [
  { path: '', component: CarBrandComponent },
  { path: ':brand', component: CarModelComponent },
  { path: ':brand/models', component: CarModelListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
