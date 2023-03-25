import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarBrand } from '../models/car-brand.model';
import { CarBrandService } from '../services/car-brand.service';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.css']
})
export class CarBrandComponent implements OnInit {
  carBrands$: Observable<CarBrand[]>;

  constructor(private carBrandService: CarBrandService) { }

  ngOnInit(): void {
    this.carBrands$ = this.carBrandService.getCarBrands();
  }
}
