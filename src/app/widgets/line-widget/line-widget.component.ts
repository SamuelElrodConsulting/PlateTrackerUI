import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Line } from 'src/app/models/line';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-line-widget',
  templateUrl: './line-widget.component.html',
  styleUrls: ['./line-widget.component.css']
})
export class LineWidgetComponent implements OnInit {
  @Output() selectedLineChanged = new EventEmitter<Line>();
  public SelectedRow: Line = null;
  lines: Line[];

  displayedColumns: string[] =['lineName', 'lineDescription',
  'lineTypeName', 'updatedBy', 'datetimeUpdated', 'edit', 'delete' ]
    

  constructor(private httpClient: HttpClient, private toastr: ToastrService, private modalService: NgbModal) { 
    this.updateLineList();  
  }
  
  async updateLineList() {
    this.httpClient.get<Line[]>('/api/' + 'Line').subscribe(result => {
      this.lines = result;
    }, error => console.error(error));
  }

  async edit(row: Line) {
    var rowToToggleValue =!row.highlighted;

    this.lines.forEach(r => {
      r.highlighted = false;
    });

    row.highlighted = rowToToggleValue;

    console.log( row)
    this.selectedLineChanged.next(row);
  }
  
  async delete(row: Line, content: any) {
    this.edit(row);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.toastr.error('Line Deleted!', 'Line Successfully Deleted!');
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
