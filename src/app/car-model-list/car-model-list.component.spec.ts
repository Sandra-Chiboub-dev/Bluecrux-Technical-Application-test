import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CarModel } from '../models/car-model';
import { CarBrand } from '../models/car-brand';
import { CarModelService } from '../services/car-model.service';
import { ActivatedRoute } from '@angular/router';
import { CardModelListComponent } from './card-model-list.component';

describe('CardModelListComponent', () => {
  let component: CardModelListComponent;
  let fixture: ComponentFixture<CardModelListComponent>;
  let carModelService: jasmine.SpyObj<CarModelService>;
  const carBrand: CarBrand = { id: 1, name: 'Toyota' };

  beforeEach(async () => {
    carModelService = jasmine.createSpyObj('CarModelService', ['getCarModelsByBrandId']);
    carModelService.getCarModelsByBrandId.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ CardModelListComponent ],
      providers: [
        { provide: CarModelService, useValue: carModelService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get car models', () => {
    const carModels: CarModel[] = [
      { id: 1, name: 'Corolla', brandId: 1 },
      { id: 2, name: 'Camry', brandId: 1 }
    ];

    carModelService.getCarModelsByBrandId.and.returnValue(of(carModels));
    component.getCarModels();
    expect(component.carModels).toEqual(carModels);
  });

  it('should handle error when getting car models', () => {
    const errorMessage = 'An error occurred while getting car models.';
    carModelService.getCarModelsByBrandId.and.returnValue(throwError(errorMessage));
    spyOn(console, 'error');
    component.getCarModels();
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should add a car model', () => {
    const carModel: CarModel = { id: 1, name: 'Corolla', brandId: 1 };
    spyOn(component.carModels$, 'next');
    spyOn(component, 'getCarModels');
    carModelService.addCarModel.and.returnValue(of(carModel));
    component.add('Corolla');
    expect(component.carModels$.next).toHaveBeenCalled();
    expect(component.getCarModels).toHaveBeenCalled();
  });

  it('should handle error when adding a car model', () => {
    const errorMessage = 'An error occurred while adding a car model.';
    spyOn(console, 'error');
    carModelService.addCarModel.and.returnValue(throwError(errorMessage));
    component.add('Corolla');
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should delete a car model', () => {
    const carModel: CarModel = { id: 1, name: 'Corolla', brandId: 1 };
    spyOn(component.carModels$, 'next');
    spyOn(component, 'getCarModels');
    carModelService.deleteCarModel.and.returnValue(of(carModel));
    component.delete(carModel);
    expect(component.carModels$.next).toHaveBeenCalled();
    expect(component.getCarModels).toHaveBeenCalled();
  });

  it('should handle error when deleting a car model', () => {
    const carModel: CarModel = { id: 1, name: 'Corolla', brand
