import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CarBrandService } from './card-brand.service';
import { CarBrand } from '../models/car-brand';

describe('CarBrandService', () => {
  let service: CarBrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CarBrandService ]
    });

    service = TestBed.inject(CarBrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCarBrands', () => {
    it('should return an Observable<CarBrand[]>', () => {
      const carBrands: CarBrand[] = [
        { id: 1, name: 'Ford' },
        { id: 2, name: 'Toyota' },
      ];

      service.getCarBrands().subscribe((result) => {
        expect(result).toEqual(carBrands);
      });

      const req = httpMock.expectOne(service.carBrandsUrl);
      expect(req.request.method).toBe('GET');
      req.flush(carBrands);
    });

    it('should return an empty array when there are no car brands', () => {
      service.getCarBrands().subscribe((result) => {
        expect(result).toEqual([]);
      });

      const req = httpMock.expectOne(service.carBrandsUrl);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });

  describe('addCarBrand', () => {
    it('should add a new car brand', () => {
      const newCarBrand: CarBrand = { name: 'BMW' };

      service.addCarBrand(newCarBrand).subscribe((carBrand) => {
        expect(carBrand).toEqual({ id: 1, name: 'BMW' });
      });

      const req = httpMock.expectOne(service.carBrandsUrl);
      expect(req.request.method).toBe('POST');
      req.flush({ id: 1, name: 'BMW' });
    });
  });

  describe('updateCarBrand', () => {
    it('should update an existing car brand', () => {
      const updatedCarBrand: CarBrand = { id: 1, name: 'Updated Ford' };

      service.updateCarBrand(updatedCarBrand).subscribe((carBrand) => {
        expect(carBrand).toEqual(updatedCarBrand);
      });

      const req = httpMock.expectOne(`${service.carBrandsUrl}/${updatedCarBrand.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedCarBrand);
    });
  });

  describe('deleteCarBrand', () => {
    it('should delete an existing car brand', () => {
      const carBrandToDelete: CarBrand = { id: 1, name: 'Ford' };

      service.deleteCarBrand(carBrandToDelete).subscribe();

      const req = httpMock.expectOne(`${service.carBrandsUrl}/${carBrandToDelete.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
