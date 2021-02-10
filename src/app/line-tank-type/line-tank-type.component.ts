import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Line } from '../models/line';
import { LineTankType } from '../models/line-tank-type';
import { TankType } from '../models/tank-measurement-tank-type';
import { LineTankTypeWidgetComponent } from '../widgets/line-tank-type-widget/line-tank-type-widget.component';

@Component({
  selector: 'app-line-tank-type',
  templateUrl: './line-tank-type.component.html',
  styleUrls: ['./line-tank-type.component.css']
})
export class LineTankTypeComponent implements OnInit {
  @ViewChild('lineTankTypeWidget') lineTankTypeWidget: LineTankTypeWidgetComponent;
  lineTankTypes: LineTankType[];

  lines: Line[];
  tankTypes: TankType[];
  
  filterLines: Line[];

  newLineId: number = null
  newTankId: number = null;
  newSequence: number = null

  updateLineTankTypeId: number = null;
  updateLineId: number = null;
  updateTankId: number = null;
  updateSequence: number = null;

  lineFilter: number = null;

  hideUpdateLineTankType = true;

 constructor(private http: HttpClient, private toastr: ToastrService) {   
    this.http.get<LineTankType[]>('/api/' + 'LineTankType').subscribe(result => {
      this.lineTankTypes = result;
    }, error => console.error(error));

    this.http.get<Line[]>('/api/' + 'Line').subscribe(result => {
      this.lines = result;
      this.filterLines = result;

      var noneLine = new Line();
      noneLine.lineId = -1;
      noneLine.lineName = 'None';
      this.filterLines.push(noneLine);
      this.lineFilter = -1;
    }, error => console.error(error));

    this.http.get<TankType[]>('/api/' + 'TankType').subscribe(result => {
      this.tankTypes = result;
    }, error => console.error(error));
  }

  async filterChanged(filterId) {
    if(filterId.value !== -1) {
      this.lineTankTypeWidget.updateLineTankTypeListByLine(filterId.value);
    } else {
      this.lineTankTypeWidget.updateLineTankTypeList();
    }
  }

  async selectedLineTankTypeChanged(lineTankType: LineTankType) {
    if (lineTankType === null || !lineTankType.highlighted) {
      this.updateLineTankTypeId = null;
      this.updateLineId = null;
      this.updateTankId = null;
      this.hideUpdateLineTankType = true;
      this.updateSequence = null;
    } else {
      this.updateLineTankTypeId = lineTankType.lineTankTypeId;
      this.updateLineId = lineTankType.lineId;
      this.updateTankId = lineTankType.tankTypeId;
      this.updateSequence = lineTankType.sequence;
      this.hideUpdateLineTankType = false;
    }
  }

  addNewLineTankType() {
    var addLineTankType = new LineTankType();
    addLineTankType.lineId = this.newLineId;
    addLineTankType.tankTypeId = this.newTankId;
    addLineTankType.sequence = this.newSequence;

    this.http.post<LineTankType>('/api/' + 'LineTankType', addLineTankType).subscribe(result => {
      this.toastr.success('Success!', 'Line Tank Type Successfully Added!');
      this.lineTankTypeWidget.updateLineTankTypeList();
    }, error =>       this.toastr.error('Error!', 'Line Tank Type FAILED to Add!'));
  }

  updateLineTankType() {
    var updateLineTankType = new LineTankType();
    updateLineTankType.lineId = this.updateLineId;
    updateLineTankType.tankTypeId = this.updateTankId;
    updateLineTankType.sequence = this.updateSequence;
    updateLineTankType.lineTankTypeId = this.updateLineTankTypeId;

    this.http.put<LineTankType>('/api/' + 'LineTankType', updateLineTankType).subscribe(result => {
      this.toastr.success('Success!', 'Line Tank Type Successfully Updated!');
      this.lineTankTypeWidget.updateLineTankTypeList();
    }, error =>       this.toastr.error('Error!', 'Line Tank Type FAILED to Update!'));
  }


  ngOnInit(): void {
  }

}
