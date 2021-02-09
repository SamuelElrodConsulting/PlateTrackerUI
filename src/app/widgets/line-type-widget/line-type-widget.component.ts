import { HttpClient} from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LineType } from 'src/app/models/line-type';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-line-type-widget',
  templateUrl: './line-type-widget.component.html',
  styleUrls: ['./line-type-widget.component.css']
})
export class LineTypeWidgetComponent implements OnInit {
  public SelectedRow: LineType = null;
  @Output() selectedLineTypeChanged = new EventEmitter<LineType>();
  lineTypes: LineType[];

  displayedColumns: string[] =['lineTypeName', 'lineTypeDescription',
    'updatedBy', 'datetimeUpdated', 'edit', 'delete' ]

  constructor(private httpClient: HttpClient, private toastr: ToastrService, private modalService: NgbModal) { 
    this.updateLineTypeList();
  }

  async updateLineTypeList() {
    this.httpClient.get<LineType[]>('/api/' + 'LineType').subscribe(result => {
      this.lineTypes = result;
    }, error => console.error(error));
  }

  async edit(row: LineType) {
    var rowToToggleValue =!row.highlighted;

    this.lineTypes.forEach(r => {
      r.highlighted = false;
    });

    row.highlighted = rowToToggleValue;

    console.log( row)
    this.selectedLineTypeChanged.next(row);
  }
  
  async delete(row: LineType, content: any) {
    this.edit(row);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.httpClient.delete<boolean>('/api/' + 'LineType/' + row.lineTypeId).subscribe(result => {
        if(result) {
          this.toastr.error('Line Type Deleted!', 'Line Type Successfully Deleted!');
          this.updateLineTypeList();
        } else {
          this.toastr.error('Error!', 'Line Type NOT Deleted!');
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
