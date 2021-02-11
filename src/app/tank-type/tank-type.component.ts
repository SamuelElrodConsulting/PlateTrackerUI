import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Line } from '../models/line';
import { LineType } from '../models/line-type';
import { TankType } from '../models/tank-measurement-tank-type';
import { TankTypeWidgetComponent } from '../widgets/tank-type-widget/tank-type-widget.component';

@Component({
  selector: 'app-tank-type',
  templateUrl: './tank-type.component.html',
  styleUrls: ['./tank-type.component.css']
})
export class TankTypeComponent implements OnInit {

  @ViewChild('tankTypeWidget') tankTypeWidget: TankTypeWidgetComponent;
  tankTypes: TankType[];

  lineTypes: LineType[];
  
  filterLines: LineType[];

  newTankTypeName = '';
  newTankTypeDescription = '';
  newLineTypeId: number = null;

  updateTankTypeName = '';
  updateTankTypeDescription = '';
  updateLineTypeId: number = null;
  updateTankTypeId: number = null;

  lineFilter: number = null;

  hideUpdateTankType = true;

 constructor(private http: HttpClient, private toastr: ToastrService) {   
    this.http.get<TankType[]>('/api/' + 'TankType').subscribe(result => {
      this.tankTypes = result;
    }, error => console.error(error));

    this.http.get<LineType[]>('/api/' + 'LineType').subscribe(result => {
      this.lineTypes = result;

      this.filterLines = result;

      var noneLine = new LineType();
      noneLine.lineTypeId = -1;
      noneLine.lineTypeName = 'None';
      this.filterLines.push(noneLine);
      this.lineFilter = -1;
    }, error => console.error(error));
  }

  async filterChanged(filterId) {
    if(filterId.value !== -1) {
      this.tankTypeWidget.updateTankTypeListByLineType(filterId.value);
    } else {
      this.tankTypeWidget.updateTankTypeList();
    }
  }


  async selectedTankTypeChanged(tankType: TankType) {
    if (tankType === null || !tankType.highlighted) {
      this.updateTankTypeName = '';
      this.updateTankTypeDescription = '';
      this.updateLineTypeId = null;
      this.updateTankTypeId = null;
      this.hideUpdateTankType = true;
    } else {
      this.updateTankTypeName = tankType.tankTypeName;
      this.updateTankTypeDescription = tankType.tankTypeDescription;
      this.updateLineTypeId = tankType.lineTypeId;
      this.updateTankTypeId = tankType.tankTypeId;
      this.hideUpdateTankType = false;
    }
  }

  addNewTankType() {
    var addTankType = new TankType();
    addTankType.tankTypeName = this.newTankTypeName;
    addTankType.tankTypeDescription = this.newTankTypeDescription;
    addTankType.lineTypeId = this.newLineTypeId;

    this.http.post<TankType>('/api/' + 'TankType', addTankType).subscribe(result => {
      this.toastr.success('Success!', 'Tank Type Successfully Added!');
      this.tankTypeWidget.updateTankTypeList();
    }, error =>       this.toastr.error('Error!', 'Tank Type FAILED to Add!'));
  }

  updateTankType() {
    var updateTankType = new TankType();
    updateTankType.tankTypeName = this.updateTankTypeName;
    updateTankType.tankTypeDescription = this.updateTankTypeDescription;
    updateTankType.lineTypeId = this.updateLineTypeId;
    updateTankType.tankTypeId = this.updateTankTypeId;

    this.http.put<TankType>('/api/' + 'TankType', updateTankType).subscribe(result => {
      this.toastr.success('Success!', 'Tank Type Successfully Updated!');
      this.tankTypeWidget.updateTankTypeList();
    }, error =>       this.toastr.error('Error!', 'Tank Type FAILED to Update!'));
  }


  ngOnInit(): void {
  }

}
