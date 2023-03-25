import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CarBrand } from '../models/car-brand.model';
import { CarModel } from '../models/car-model.model';

export class MockedDataService implements InMemoryDbService {
  createDb() {
    const carBrands: CarBrand[] = [
      {id: 1, name: 'Volkswagen'},
      {id: 2, name: 'Toyota'},
      {id: 3, name: 'Ford'},
      {id: 4, name: 'Renault'},
      {id: 5, name: 'Mercedes'},
      {id: 6, name: 'KIA'}
    ];

    const carModels: CarModel[] = [
      { id: 1, brand: 'Volkswagen', name: 'Caravelle', year: 2021 },
      { id: 2, brand: 'Volkswagen', name: 'Crafter', year: 2022 },
      { id: 3, brand: 'Volkswagen', name: 'Golf', year: 2021 },
      { id: 4, brand: 'Toyota', name: 'Corolla', year: 2022 },
      { id: 5, brand: 'Toyota', name: 'Camry', year: 2021 },
      { id: 6, brand: 'Ford', name: 'Mustang', year: 2021 },
      { id: 7, brand: 'Ford', name: 'F-150', year: 2022 },
      { id: 8, brand: 'Renault', name: 'Kangoo', year: 2021 },
      { id: 9, brand: 'Renault', name: 'Megane', year: 2022 },
      { id: 10, brand: 'Mercedes', name: 'Classe A', year: 2021 },
      { id: 11, brand: 'Mercedes', name: 'Classe C', year: 2022 },
    ];

    return { carBrands, carModels };
  }
}