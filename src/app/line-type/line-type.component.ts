import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LineType } from '../models/line-type';
import { LineTypeWidgetComponent } from '../widgets/line-type-widget/line-type-widget.component';

@Component({
  selector: 'app-line-type',
  templateUrl: './line-type.component.html',
  styleUrls: ['./line-type.component.css']
})
export class LineTypeComponent implements OnInit {
  @ViewChild('lineTypeWidget') lineTypeWidget: LineTypeWidgetComponent;

  newLineTypeName = '';
  newLineTypeDescription = '';

  updateLineTypeName = '';
  updateLineTypeDescription = '';
  updateLineTypeId = null;

  hideUpdateLineType = true;

  constructor(private http: HttpClient, private toastr: ToastrService) {   
  }

  async selectedLineTypeChanged(lineType: LineType) {
    if (lineType === null || !lineType.highlighted) {
      this.updateLineTypeName = '';
      this.updateLineTypeDescription = '';
      this.updateLineTypeId = null;
      this.hideUpdateLineType = true;

    } else {
      this.updateLineTypeName = lineType.lineTypeName;
      this.updateLineTypeDescription = lineType.lineTypeDescription;
      this.updateLineTypeId = lineType.lineTypeId;
      this.hideUpdateLineType = false;
    }
  }

  async addNewLineType() {
    var addLineType = new LineType();
    addLineType.lineTypeName = this.newLineTypeName;
    addLineType.lineTypeDescription = this.newLineTypeDescription;

    this.http.post<LineType>('/api/' + 'Linetype', addLineType).subscribe(result => {
      this.toastr.success('Success!', 'Line Type Successfully Added!');
      this.lineTypeWidget.updateLineTypeList();
    }, error =>       this.toastr.error('Error!', 'Line Type FAILED to Add!'));
  }
  
  async updateLineType() {
    var updateLineType = new LineType();
    updateLineType.lineTypeName = this.updateLineTypeName;
    updateLineType.lineTypeDescription = this.updateLineTypeDescription;
    updateLineType.lineTypeId = this.updateLineTypeId;

    this.http.put<LineType>('/api/' + 'Linetype', updateLineType).subscribe(result => {
      this.toastr.success('Success!', 'Line Type Successfully Updated!');
      this.lineTypeWidget.updateLineTypeList();

    }, error =>       this.toastr.error('Error!', 'Line Type FAILED to Update!'));
  }

  ngOnInit(): void {
  }

}
