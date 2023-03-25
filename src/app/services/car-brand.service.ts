import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CarBrand } from '../models/car-brand.model';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {
  private carBrandsUrl = 'api/carBrands';

  constructor(private http: HttpClient) { }

  getCarBrands(): Observable<CarBrand[]> {
    return this.http.get<CarBrand[]>(this.carBrandsUrl)
      .pipe(
        catchError(this.handleError<CarBrand[]>('getCarBrands', []))
      );
  }

  addCarBrand(carBrand: CarBrand): Observable<CarBrand> {
    return this.http.post<CarBrand>(this.carBrandsUrl, carBrand)
      .pipe(
        tap((newCarBrand: CarBrand) => console.log(`added car brand w/ id=${newCarBrand.id}`)),
        catchError(this.handleError<CarBrand>('addCarBrand'))
      );
  }

  deleteCarBrand(carBrand: CarBrand | number): Observable<CarBrand> {
    const id = typeof carBrand === 'number' ? carBrand : carBrand.id;
    const url = `${this.carBrandsUrl}/${id}`;

    return this.http.delete<CarBrand>(url)
      .pipe(
        tap(_ => console.log(`deleted car brand id=${id}`)),
        catchError(this.handleError<CarBrand>('deleteCarBrand'))
      );
  }

  updateCarBrand(carBrand: CarBrand): Observable<any> {
    return this.http.put(this.carBrandsUrl, carBrand)
      .pipe(
        tap(_ => console.log(`updated car brand id=${carBrand.id}`)),
        catchError(this.handleError<any>('updateCarBrand'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
