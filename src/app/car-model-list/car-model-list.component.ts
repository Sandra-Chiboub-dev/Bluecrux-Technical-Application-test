import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CarBrand } from '../models/car-brand.model';
import { CarModel } from '../models/car-model.model';
import { CarBrandService } from '../services/car-brand.service';
import { CarModelService } from '../services/car-model.service';

@Component({
  selector: 'app-card-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.css']
})
export class CarModelListComponent implements OnInit {
  carModels$: Observable<CarModel[]> | undefined;
  selectedCarModel: CarModel | undefined;
  isEditMode: boolean = false;
  carBrand: CarBrand | undefined;

  constructor(
    private carModelService: CarModelService,
    private carBrandService: CarBrandService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCarModels();
  }

  getCarModels(): void {
    this.carModels$ = this.route.paramMap.pipe(
      switchMap(params => {
        const brandId = Number(params.get('id'));
        this.carBrandService.getCarBrand(brandId).subscribe(carBrand => this.carBrand = carBrand);
        return this.carModelService.getCarModelsByBrandId(brandId);
      })
    );
  }

  onSelect(carModel: CarModel): void {
    this.selectedCarModel = carModel;
    this.isEditMode = false;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    if (!this.carBrand) { return; }
    const carModel = { name, brandId: this.carBrand.id } as CarModel;
    this.carModelService.addCarModel(carModel)
      .subscribe(carModel => {
        this.carModels$?.push(carModel);
        this.selectedCarModel = undefined;
      });
  }

  delete(carModel: CarModel): void {
    this.carModels$ = this.carModels$?.filter(cm => cm !== carModel);
    this.selectedCarModel = undefined;
    this.carModelService.deleteCarModel(carModel).subscribe();
  }

  edit(carModel: CarModel): void {
    this.isEditMode = true;
    this.selectedCarModel = carModel;
  }

  update(): void {
    if (this.selectedCarModel) {
      this.carModelService.updateCarModel(this.selectedCarModel).subscribe();
      this.selectedCarModel = undefined;
      this.isEditMode = false;
    }
  }

  cancel(): void {
    this.selectedCarModel = undefined;
    this.isEditMode = false;
  }
}
