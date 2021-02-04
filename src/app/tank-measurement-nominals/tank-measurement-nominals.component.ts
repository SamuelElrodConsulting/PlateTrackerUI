import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TankMeasurementType } from '../models/tank-measurement-type';
import { HttpClient } from '@angular/common/http';
import { TankMeasurementNominal } from '../models/tank-measurement-nominal';
import { NominalsWidgetComponent } from '../widgets/nominals-widget/nominals-widget.component';
import { TankType } from '../models/tank-measurement-tank-type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tank-measurement-nominals',
  templateUrl: './tank-measurement-nominals.component.html',
  styleUrls: ['./tank-measurement-nominals.component.css']
})
export class TankMeasurmentNominalsComponent implements OnInit {
  @ViewChild('nominalWidget') nominalWidget: NominalsWidgetComponent;

  
  httpClient: HttpClient;
  
  newTankName = '';
  newTankMeasurement = '';
  newLowNominalValue = 0;
  newIdealNominalValue = 0;
  newHighNominalValue = 0;
  newMinTestingDays = 0;
  newIdealTestingDays = 0;
  newTankMeasurementTypeId : number = null;
  newTankTypeId: number = null;

  updateTankName = '';
  updateTankMeasurement = '';
  updateLowNominalValue = 0;
  updateIdealNominalValue = 0;
  updateHighNominalValue = 0;
  updateMinTestingDays = 0;
  updateIdealTestingDays = 0;
  updateTankMeasurementNominalId = null;
  updateTankMeasurementTypeId: number = null;
  updateTankTypeId: number = null;

  measurementTypes: TankMeasurementType[];
  tankTypes: TankType[];

 hideUpdatedNominalForm = true;

  constructor(http: HttpClient, private toastr: ToastrService) {   
    this.httpClient = http;
    http.get<TankMeasurementType[]>('/api/' + 'TankMeasurementType').subscribe(result => {
      this.measurementTypes = result;
      console.log(result);
    }, error => console.error(error));

    http.get<TankType[]>('/api/' + 'TankType').subscribe(result => {
      this.tankTypes = result;
      console.log(result);
    }, error => console.error(error));
  }

  async selectedNominalChanged(nominal: TankMeasurementNominal) {
    if (nominal === null || !nominal.highlighted) {
      this.updateTankName = '';
      this.updateTankMeasurement = '';
      this.updateLowNominalValue = 0;
      this.updateIdealNominalValue = 0;
      this.updateHighNominalValue = 0;
      this.updateMinTestingDays = 0;
      this.updateIdealTestingDays = 0;
      this.updateTankMeasurementTypeId = null;
      this.updateTankTypeId = null;
      this.hideUpdatedNominalForm = true;
    } else {
      console.log(nominal.tankMeasurementTypeId);
      this.updateTankName = nominal.tankTypeName;
      this.updateTankMeasurement = nominal.tankMeasurementTypeName;
      this.updateLowNominalValue = nominal.lowNominalValue;
      this.updateIdealNominalValue = nominal.idealNominalValue;
      this.updateHighNominalValue = nominal.highNominalValue;
      this.updateMinTestingDays = nominal.minimumTestingFrequencyDays;
      this.updateIdealTestingDays = nominal.idealTestingFrequencyDays;
      this.updateTankMeasurementTypeId = nominal.tankMeasurementTypeId;
      this.updateTankTypeId = nominal.tankTypeId;
      this.updateTankMeasurementNominalId = nominal.tankMeasurementNominalId;
      this.hideUpdatedNominalForm = false;
    }
  }
  async updateNominal() {
    var updateNominal = new TankMeasurementNominal();
    updateNominal.highNominalValue = this.updateHighNominalValue;
    updateNominal.idealNominalValue = this.updateIdealNominalValue;
    updateNominal.idealTestingFrequencyDays = this.updateIdealTestingDays;
    updateNominal.lowNominalValue = this.updateLowNominalValue;
    updateNominal.minimumTestingFrequencyDays = this.updateMinTestingDays;
    updateNominal.tankTypeId = this.updateTankTypeId;
    updateNominal.tankMeasurementTypeId = this.updateTankMeasurementTypeId;
    updateNominal.tankMeasurementNominalId = this.updateTankMeasurementNominalId;
    this.httpClient.put<TankType[]>('/api/' + 'TankMeasurementNominal', updateNominal).subscribe(result => {
      this.nominalWidget.updateNominalList();
      this.toastr.success('Success!', 'Nominal Successfully Updated!');

    }, error =>       this.toastr.error('Error!', 'Nominal FAILED to Update!'));
  }

  async addNewNominal() {
    var newNominal = new TankMeasurementNominal();
    newNominal.highNominalValue = this.newHighNominalValue;
    newNominal.idealNominalValue = this.newIdealNominalValue;
    newNominal.idealTestingFrequencyDays = this.newIdealTestingDays;
    newNominal.lowNominalValue = this.newLowNominalValue;
    newNominal.minimumTestingFrequencyDays = this.newMinTestingDays;
    newNominal.tankTypeId = this.newTankTypeId;
    newNominal.tankMeasurementTypeId = this.newTankMeasurementTypeId;
    this.httpClient.post<TankType[]>('/api/' + 'TankMeasurementNominal', newNominal).subscribe(result => {
      this.nominalWidget.updateNominalList();
      this.toastr.success('Success!', 'Nominal Successfully Added!');

    }, error =>       this.toastr.error('Error!', 'Nominal FAILED to Insert!'));
  }
  ngOnInit(): void {

  }
}
