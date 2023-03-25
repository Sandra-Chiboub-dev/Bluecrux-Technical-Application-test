import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarModelService } from './car-model.service';
import { CarModel } from '../models/car-model.model';

describe('CardModelService', () => {
  let service: CarModelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CarModelService ]
    });
    service = TestBed.inject(CarModelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of car models', () => {
    const mockModels: CarModel[] = [
      { id: 1, brand: 'brand1', name: 'Model 1', year: 2020 },
      { id: 2, brand: 'brand2', name: 'Model 2', year: 2021 },
      { id: 3, brand: 'brand3', name: 'Model 3', year: 2022 }
    ];

    service.getCarModels().subscribe(models => {
      expect(models.length).toBe(3);
      expect(models).toEqual(mockModels);
    });

    const req = httpMock.expectOne('api/carModels');
    expect(req.request.method).toBe('GET');
    req.flush(mockModels);
  });

  it('should add a new car model', () => {
    const newModel: CarModel = { id: 4, brand: 'brand4', name: 'Model 4', year: 2023 };

    service.addCarModel(newModel).subscribe(model => {
      expect(model).toEqual(newModel);
    });

    const req = httpMock.expectOne('api/carModels');
    expect(req.request.method).toBe('POST');
    req.flush(newModel);
  });

  it('should update an existing car model', () => {
    const updatedModel: CarModel = { id: 2, brand: 'updatedbrand', name: 'Updated Model', year: 2021 };

    service.updateCarModel(updatedModel).subscribe(model => {
      expect(model).toEqual(updatedModel);
    });

    const req = httpMock.expectOne('api/carModels/2');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedModel);
  });

  it('should delete an existing car model', () => {
    const modelToDelete: CarModel = { id: 3, brand: 'brand 3', name: 'Model 3', year: 2022 };

    service.deleteCarModel(modelToDelete).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne('api/carModels/3');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
