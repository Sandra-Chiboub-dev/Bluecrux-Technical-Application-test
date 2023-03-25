import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CarModel } from '../models/car-model.model';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {
  private carModelsUrl = 'api/carModels'; // URL to web api

  constructor(private http: HttpClient) { }

  getCarModels(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(this.carModelsUrl)
      .pipe(
        tap(_ => console.log('fetched car models')),
        catchError(this.handleError<CarModel[]>('getCarModels', []))
      );
  }

  getCarModel(id: number): Observable<CarModel> {
    const url = `${this.carModelsUrl}/${id}`;
    return this.http.get<CarModel>(url).pipe(
      tap(_ => console.log(`fetched car model id=${id}`)),
      catchError(this.handleError<CarModel>(`getCarModel id=${id}`))
    );
  }

  addCarModel(carModel: CarModel): Observable<CarModel> {
    return this.http.post<CarModel>(this.carModelsUrl, carModel).pipe(
      tap((newCarModel: CarModel) => console.log(`added car model w/ id=${newCarModel.id}`)),
      catchError(this.handleError<CarModel>('addCarModel'))
    );
  }

  deleteCarModel(carModel: CarModel | number): Observable<CarModel> {
    const id = typeof carModel === 'number' ? carModel : carModel.id;
    const url = `${this.carModelsUrl}/${id}`;

    return this.http.delete<CarModel>(url).pipe(
      tap(_ => console.log(`deleted car model id=${id}`)),
      catchError(this.handleError<CarModel>('deleteCarModel'))
    );
  }

  updateCarModel(carModel: CarModel): Observable<any> {
    return this.http.put(`${this.carModelsUrl}/${carModel.id}`, carModel).pipe(
      tap(_ => console.log(`updated car model id=${carModel.id}`)),
      catchError(this.handleError<any>('updateCarModel'))
    );
  }

  searchCarModels(term: string): Observable<CarModel[]> {
    if (!term.trim()) {
      // if not search term, return empty car model array.
      return of([]);
    }
    return this.http.get<CarModel[]>(`${this.carModelsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found car models matching "${term}"`) :
        console.log(`no car models matching "${term}"`)),
      catchError(this.handleError<CarModel[]>('searchCarModels', []))
    );
  }

  // Error handling method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
