import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CardModelComponent } from './card-model.component';
import { CarModel } from '../models/car-model';
import { CarModelService } from '../services/car-model.service';
import { of } from 'rxjs';

describe('CardModelComponent', () => {
  let component: CardModelComponent;
  let fixture: ComponentFixture<CardModelComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let carModelService: CarModelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardModelComponent ],
      providers: [
        {
          provide: CarModelService,
          useValue: {
            deleteCarModel: () => of(),
            updateCarModel: () => of()
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardModelComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    htmlElement = debugElement.nativeElement;
    carModelService = TestBed.inject(CarModelService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the name of the car model', () => {
    const carModel: CarModel = { id: 1, name: 'Test Model' };
    component.carModel = carModel;
    fixture.detectChanges();
    const modelName = htmlElement.querySelector('.card-title')?.textContent;
    expect(modelName).toContain(carModel.name);
  });

  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.deleteCarModel, 'emit');
    const deleteButton = debugElement.query(By.css('.btn-danger')).nativeElement;
    deleteButton.click();
    fixture.detectChanges();
    expect(component.deleteCarModel.emit).toHaveBeenCalled();
  });

  it('should enter edit mode when edit button is clicked', () => {
    const editButton = debugElement.query(By.css('.btn-primary')).nativeElement;
    editButton.click();
    fixture.detectChanges();
    expect(component.isEditMode).toBeTrue();
  });

  it('should call updateCarModel when update button is clicked', () => {
    spyOn(carModelService, 'updateCarModel').and.callThrough();
    component.carModel = { id: 1, name: 'Test Model' };
    component.isEditMode = true;
    fixture.detectChanges();
    const updateButton =
