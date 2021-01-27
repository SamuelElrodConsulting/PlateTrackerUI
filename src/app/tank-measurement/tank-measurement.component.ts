import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../models/employee';
import { TankMeasurement } from '../models/tank-measurement';
import { TankMeasurementTankType } from '../models/tank-measurement-tank-type';
import { TankMeasurementType } from '../models/tank-measurement-type';
import { TankMeasurementWidgetComponent } from '../widgets/tank-measurement-widget/tank-measurement-widget.component';

@Component({
  selector: 'app-tank-measurement',
  templateUrl: './tank-measurement.component.html',
  styleUrls: ['./tank-measurement.component.css']
})
export class TankMeasurementComponent implements OnInit {
  @ViewChild('measurementWidget') measurementWidget: TankMeasurementWidgetComponent;

  measurementTypes: TankMeasurementType[];
  tankTypes: TankMeasurementTankType[];
  employees: Employee[];

  newTankType = '';
  newTankMeasurement = '';
  newValue = 0;
  newEmployeeId = 0;
  newMeasurementDate: Date;
  newTankMeasurementTypeId : number = null;
  newTankMeasurementTankTypeId: number = null;

  updateTankType = '';
  updateTankMeasurement = '';
  updateValue = 0;
  updateEmployeeId = 0;
  updateMeasurementDate: Date;
  updateTankMeasurementTypeId : number = null;
  updateTankMeasurementTankTypeId: number = null;
  updateTankMeasurementId: number = null;
  
  hideUpateMeasurementForm = true;

  constructor(private http: HttpClient, private toastr: ToastrService) {   
    this.loadData();
  }

  ngAfterViewInit() {
    this.measurementWidget.loadData();
  }

  async loadData() {
    this.http.get<TankMeasurementType[]>('/api/' + 'TankMeasurementType').subscribe(result => {
      this.measurementTypes = result;
    }, error => console.error(error));

    this.http.get<TankMeasurementTankType[]>('/api/' + 'TankMeasurementTankType').subscribe(result => {
      this.tankTypes = result;
    }, error => console.error(error));

    this.http.get<Employee[]>('/api/' + 'EmployeeMeasurement').subscribe(result => {
      this.employees = result;
      console.log(result);
    }, error => console.error(error));
  }

  async selectedMeasurementChanged(measurement: TankMeasurement) {
    if (measurement === null || !measurement.highlighted) {
      this.updateValue = 0;
      this.updateEmployeeId = 0;
      this.updateMeasurementDate = null;
      this.updateTankMeasurement = '';
      this.updateTankMeasurementTypeId = null;
      this.updateTankMeasurementTankTypeId = null;
      this.hideUpateMeasurementForm = true;
    } else {
      this.updateValue = measurement.value;
      this.updateEmployeeId = measurement.tankMeasurementEmployeeId;
      this.updateMeasurementDate = measurement.tankMeasurementDatetime;
      this.updateTankMeasurement = '';
      this.updateTankMeasurementTypeId = measurement.tankMeasurementTypeId;
      this.updateTankMeasurementTankTypeId = measurement.tankMeasurementTankTypeId;
      this.updateTankMeasurementId = measurement.tankMeasurementId;
      this.hideUpateMeasurementForm = false;
    }
  }
  
  
  async addMeasurement() {
    var addMeasurement = new TankMeasurement();
    addMeasurement.tankMeasurementTypeId = this.newTankMeasurementTypeId;
    addMeasurement.tankMeasurementTankTypeId = this.newTankMeasurementTankTypeId;
    addMeasurement.value = this.newValue;
    addMeasurement.tankMeasurementEmployeeId = this.newEmployeeId;
    addMeasurement.tankMeasurementDatetime = this.newMeasurementDate;

    this.http.post<TankMeasurementTankType[]>('/api/' + 'TankMeasurement', addMeasurement).subscribe(result => {
      this.measurementWidget.loadData();
      this.toastr.success('Success!', 'Measurement Successfully Added!');
      this.loadData();
    }, error =>       this.toastr.error('Error!', 'Measurement FAILED to Add!'));
  }
  
  async updateMeasurement() {
    var updateMeasurement = new TankMeasurement();
    updateMeasurement.tankMeasurementTypeId = this.updateTankMeasurementTypeId;
    updateMeasurement.tankMeasurementTankTypeId = this.updateTankMeasurementTankTypeId;
    updateMeasurement.value = this.updateValue;
    updateMeasurement.tankMeasurementEmployeeId = this.updateEmployeeId;
    updateMeasurement.tankMeasurementDatetime = this.updateMeasurementDate;
    updateMeasurement.tankMeasurementId = this.updateTankMeasurementId;
    this.http.put<TankMeasurementTankType[]>('/api/' + 'TankMeasurement', updateMeasurement).subscribe(result => {
      this.measurementWidget.loadData();
      this.toastr.success('Success!', 'Measurement Successfully Updated!');

    }, error =>       this.toastr.error('Error!', 'Measurement FAILED to Update!'));
  }
  
  ngOnInit(): void {
  }

}
