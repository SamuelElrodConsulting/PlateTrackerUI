import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TankType } from 'src/app/models/tank-measurement-tank-type';

@Component({
  selector: 'app-tank-type-widget',
  templateUrl: './tank-type-widget.component.html',
  styleUrls: ['./tank-type-widget.component.css']
})
export class TankTypeWidgetComponent implements OnInit { 
  @Output() selectedTankTypeChanged = new EventEmitter<TankType>();
  public SelectedRow: TankType = null;
  tankTypes: TankType[];

  displayedColumns: string[] =['tankTypeName', 'tankTypeDescription',
  'lineTypeName', 'updatedBy', 'datetimeUpdated', 'edit', 'delete' ]
    

  constructor(private httpClient: HttpClient, private toastr: ToastrService, private modalService: NgbModal) { 
    this.updateTankTypeList();  
  }

  async updateTankTypeList() {
    this.httpClient.get<TankType[]>('/api/' + 'TankType').subscribe(result => {
      this.tankTypes = result;
    }, error => console.error(error));
  }

  async updateTankTypeListByLineType(lineId: number) {
    console.log(lineId);
    this.httpClient.get<TankType[]>('/api/' + 'TankTypeFilter/' + lineId).subscribe(result => {
      this.tankTypes = result;
    }, error => console.error(error));
  }
  
  async edit(row: TankType) {
    var rowToToggleValue =!row.highlighted;

    this.tankTypes.forEach(r => {
      r.highlighted = false;
    });

    row.highlighted = rowToToggleValue;

    console.log( row)
    this.selectedTankTypeChanged.next(row);
  }
  
  async delete(row: TankType, content: any) {
    this.edit(row)

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.httpClient.delete<boolean>('/api/' + 'TankType/' + row.tankTypeId).subscribe(result => {
        if(result) {
          this.toastr.error('Tank Type Deleted!', 'Tank Type Successfully Deleted!');
          this.updateTankTypeList();
        } else {
          this.toastr.error('Error!', 'Tank Type NOT Deleted!');
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
