import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { TankMeasurementNominal } from '../models/tank-measurement-nominal';
import { TankMeasurementTankType } from '../models/tank-measurement-tank-type';
import { TankMeasurementType } from '../models/tank-measurement-type';
import { TankMeasurementWidgetComponent } from '../widgets/tank-measurement-widget/tank-measurement-widget.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';

@Component({
  selector: 'app-tank-measurement-detail',
  templateUrl: './tank-measurement-detail.component.html',
  styleUrls: ['./tank-measurement-detail.component.css']
})

export class TankMeasurementDetailComponent implements OnInit {
  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };



  @ViewChild('tankMeasurementsWidget') tankMeasurementsWidget: TankMeasurementWidgetComponent;

  currentTank: TankMeasurementTankType;
  currentMeasurement: TankMeasurementType;

  selectedTankMeasurementTankTypeId: number;
  selectedTankMeasurementTypeId: number;

  tankTypes: TankMeasurementTankType [];
  measurementTypes: TankMeasurementType[];

  constructor(http: HttpClient, private toastr: ToastrService) {   
    http.get<TankMeasurementType[]>('/api/' + 'TankMeasurementType').subscribe(result => {
      this.measurementTypes = result;
    }, error => console.error(error));

    http.get<TankMeasurementTankType[]>('/api/' + 'TankMeasurementTankType').subscribe(result => {
      this.tankTypes = result;
    }, error => console.error(error));

    Object.assign(this, { multi });

  }

  async loadDataFromTankSelection(value: MatSelectChange) {
    this.selectedTankMeasurementTankTypeId = value.value;   
    if(!this.selectedTankMeasurementTypeId) {
      this.tankMeasurementsWidget.loadDataByTankType(value.value);
    } else {
      this.tankMeasurementsWidget.loadDataByTankTypeAndMeasurementType(value.value, this.selectedTankMeasurementTypeId);
    }
  }

  async loadDataFromMeasurementTypeSelection(value: MatSelectChange) {
    this.selectedTankMeasurementTypeId = value.value;
    if(this.selectedTankMeasurementTankTypeId) {
      this.tankMeasurementsWidget.loadDataByTankTypeAndMeasurementType(this.selectedTankMeasurementTankTypeId, value.value);
    }
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.tankMeasurementsWidget.clearData();
  }

  
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
