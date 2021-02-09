import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LineTankType } from 'src/app/models/line-tank-type';

@Component({
  selector: 'app-line-tank-type-widget',
  templateUrl: './line-tank-type-widget.component.html',
  styleUrls: ['./line-tank-type-widget.component.css']
})
export class LineTankTypeWidgetComponent implements OnInit {
  @Output() selectedLineTankTypeChanged = new EventEmitter<LineTankType>();
  public SelectedRow: LineTankType = null;
  lineTankTypes: LineTankType[];

  displayedColumns: string[] =['lineName', 'tankTypeName',
  'sequence', 'updatedBy', 'datetimeUpdated', 'edit', 'delete' ]
    

  constructor(private httpClient: HttpClient, private toastr: ToastrService, private modalService: NgbModal) { 
    this.updateLineTankTypeList();  
  }

  async updateLineTankTypeList() {
    this.httpClient.get<LineTankType[]>('/api/' + 'LineTankType').subscribe(result => {
      this.lineTankTypes = result;
    }, error => console.error(error));
  }

  async edit(row: LineTankType) {
    var rowToToggleValue =!row.highlighted;

    this.lineTankTypes.forEach(r => {
      r.highlighted = false;
    });

    row.highlighted = rowToToggleValue;

    console.log( row)
    this.selectedLineTankTypeChanged.next(row);
  }
  
  async delete(row: LineTankType, content: any) {
    this.edit(row)

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.httpClient.delete<boolean>('/api/' + 'LineTankType' + row.lineTankTypeId).subscribe(result => {
        if(result) {
          this.toastr.error('Line Tank Type Deleted!', 'Line Tank Type Successfully Deleted!');
          this.updateLineTankTypeList();
        } else {
          this.toastr.error('Error!', 'Line Tank Type NOT Deleted!');
        }
      }, error => console.error(error));
    }, (reason) => {

    });
  }

  private Confirmed(reason: any): boolean {
    if (reason === ModalDismissReasons.ESC) {
      return false;
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return false;
    } else {
      return true;
    }
  }


  ngOnInit(): void {
  }

}
