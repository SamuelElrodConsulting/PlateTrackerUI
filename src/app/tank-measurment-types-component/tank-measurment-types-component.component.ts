import { Component, Inject, OnInit } from '@angular/core';
import { TankMeasurementType } from '../models/tank-measurement-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tank-measurment-types-component',
  templateUrl: './tank-measurment-types-component.component.html',
  styleUrls: ['./tank-measurment-types-component.component.css']
})
export class TankMeasurmentTypesComponentComponent implements OnInit {
  public tankMeasurementTypes: TankMeasurementType[];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  
  constructor(http: HttpClient) {
    let baseUrl: string = '/api/';
    console.log('Base url: ' + baseUrl);
    http.get<TankMeasurementType[]>(baseUrl + 'TankMeasurementType').subscribe(result => {
      console.log(result);
      this.tankMeasurementTypes = result;
    }, error => console.error(error));
  }


  ngOnInit(): void {
  }

}
