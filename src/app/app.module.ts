import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockedDataService } from './services/mocked-data-service';
import { AppComponent } from './app.component';
import { CarBrandComponent } from './car-brand/car-brand.component';
import { CarModelComponent } from './car-model/car-model.component';
import { CarModelListComponent } from './car-model-list/car-model-list.component';
import { AppRoutingModule } from './app-routing.module';
import { CarBrandService } from './services/car-brand.service';
import { CarModelService } from './services/car-model.service';

@NgModule({
  declarations: [
    AppComponent,
    CarBrandComponent,
    CarModelComponent,
    CarModelListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MockedDataService, { delay: 1000 }),
    AppRoutingModule
  ],
  providers: [
    CarBrandService,
    CarModelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
