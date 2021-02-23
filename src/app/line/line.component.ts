import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Line } from '../models/line';
import { LineType } from '../models/line-type';
import { LineTypeWidgetComponent } from '../widgets/line-type-widget/line-type-widget.component';
import { LineWidgetComponent } from '../widgets/line-widget/line-widget.component';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  @ViewChild('lineWidget') lineWidget: LineWidgetComponent;
  lineTypes: LineType[];
  
  newLineName = '';
  newLineDescription = '';
  newLineTypeId: number = null;

  updateLineName = '';
  updateLineDescription = '';
  updateLineId: number = null;
  updateLineTypeId: number = null;

  hideUpdateLine = true;

  constructor(private http: HttpClient, private toastr: ToastrService) {   
    this.http.get<LineType[]>('/api/' + 'LineType').subscribe(result => {
      this.lineTypes = result;
    }, error => console.error(error));

  }

  async selectedLineChanged(line: Line) {
    if (line === null || !line.highlighted) {
      this.updateLineName = '';
      this.updateLineDescription = '';
      this.updateLineId = null;
      this.hideUpdateLine = true;
    } else {
      this.updateLineName = line.lineName;
      this.updateLineDescription = line.lineDescription;
      this.updateLineId = line.lineId;
      this.updateLineTypeId = line.lineTypeId;
      this.hideUpdateLine = false;
    }
  }

  addNewLine() {
    var addLine = new Line();
    addLine.lineName = this.newLineName;
    addLine.lineDescription = this.newLineDescription ;
    addLine.lineTypeId = this.newLineTypeId;

    this.http.post<Line>('/api/' + 'Line', addLine).subscribe(result => {
      this.toastr.success('Success!', 'Line Successfully Added!');
      this.lineWidget.updateLineList();
    }, error =>       this.toastr.error('Error!', 'Line FAILED to Add!'));
  }

  updateLine() {
    var updateLine = new Line();
    updateLine.lineName = this.updateLineName;
    updateLine.lineDescription = this.updateLineDescription;
    updateLine.lineTypeId = this.updateLineTypeId;
    updateLine.lineId = this.updateLineId;

    this.http.put<Line>('/api/' + 'Line', updateLine).subscribe(result => {
      this.toastr.success('Success!', 'Line Successfully Updated!');
      this.lineWidget.updateLineList();
    }, error =>       this.toastr.error('Error!', 'Line FAILED to Update!'));
  }

  ngOnInit(): void {
  }

}
