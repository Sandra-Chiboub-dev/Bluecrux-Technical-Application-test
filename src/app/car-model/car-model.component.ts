import { Component, Input, OnInit } from '@angular/core';
import { CarModel } from '../models/car-model';
import { CarModelService } from '../services/car-model.service';

@Component({
  selector: 'app-card-model',
  templateUrl: './card-model.component.html',
  styleUrls: ['./card-model.component.css']
})
export class CardModelComponent implements OnInit {
  @Input() carModel: CarModel | undefined;
  isEditMode: boolean = false;

  constructor(private carModelService: CarModelService) { }

  ngOnInit(): void {
  }

  delete(): void {
    if (this.carModel) {
      this.carModelService.deleteCarModel(this.carModel).subscribe();
    }
  }

  edit(): void {
    this.isEditMode = true;
  }

  update(): void {
    if (this.carModel) {
      this.carModelService.updateCarModel(this.carModel).subscribe();
      this.isEditMode = false;
    }
  }

  cancel(): void {
    this.isEditMode = false;
  }

}
