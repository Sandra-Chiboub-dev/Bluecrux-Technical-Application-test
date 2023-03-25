
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { CarBrand } from '../models/car-brand.model';
import { CarBrandService } from '../services/car-brand.service';
import { CarBrandComponent } from './car-brand.component';

describe('CarBrandComponent', () => {
  let component: CarBrandComponent;
  let fixture: ComponentFixture<CarBrandComponent>;
  let carBrandServiceStub: Partial<CarBrandService>;
  let carBrands$: Observable<CarBrand[]>;

  beforeEach(async () => {
    carBrands$ = of([
      { id: 1, name: 'Ford' },
      { id: 2, name: 'Toyota' }
    ]);

    carBrandServiceStub = {
      getCarBrands: () => carBrands$
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CarBrandComponent],
      providers: [{ provide: CarBrandService, useValue: carBrandServiceStub }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display car brands', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('li').textContent).toContain('Ford');
    expect(compiled.querySelector('li:last-of-type').textContent).toContain('Toyota');
  });

  it('should emit brandSelected event when a brand is clicked', () => {
    spyOn(component.brandSelected, 'emit');
    const compiled = fixture.nativeElement;
    const li = compiled.querySelector('li');
    li.click();
    fixture.detectChanges();
    expect(component.brandSelected.emit).toHaveBeenCalledOnceWith({ id: 1, name: 'Ford' });
  });
});