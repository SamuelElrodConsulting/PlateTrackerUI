import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TankMeasurement } from 'src/app/models/tank-measurement';

@Component({
  selector: 'app-tank-measurement-widget',
  templateUrl: './tank-measurement-widget.component.html',
  styleUrls: ['./tank-measurement-widget.component.css']
})
export class TankMeasurementWidgetComponent implements OnInit {
  tankMeasurements: TankMeasurement[];
  displayedColumns: string[] =['TankeMeasurementTypeName', 'TankMeasurementTankTypeName',
  'TankMeasurementDescription', 'Value', 'UOM', 'EmployeeName', 'TankMeasurementDatetime', 'edit', 'delete']

  public SelectedRow: TankMeasurement = null;
  @Output() selectedMeasurementChanged = new EventEmitter<TankMeasurement>();


  constructor(private http: HttpClient, private toastr: ToastrService,  private modalService: NgbModal) { 
    this.loadData();
  }

  async loadData() {
    this.http.get<TankMeasurement[]>('/api/' + 'TankMeasurement').subscribe(result => {
      this.tankMeasurements = result;
      console.log(result);
    }, error => console.error(error));
  }
  
  async edit(row: TankMeasurement) {
    var rowToToggleValue =!row.highlighted;

    this.tankMeasurements.forEach(r => {
      r.highlighted = false;
    });

    row.highlighted = rowToToggleValue;

    console.log(row.highlighted)

    this.selectedMeasurementChanged.next(row);
  }
  
  async selectRow(row: TankMeasurement) {

  }

  async delete(row: TankMeasurement, content: any) {
    this.edit(row);


    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.http.delete<boolean>('/api/' + 'TankMeasurement/'+ row.tankMeasurementId).subscribe(result => {
        if (result) {
          this.toastr.error('Measurement Deleted!', 'Measurement Successfully Deleted!');
          this.loadData();  
        } else {
          this.toastr.error('Error!', 'Measurement NOT Deleted!')
        }

      }, error => 
        this.toastr.error('Error!', 'Measurement NOT Deleted!')
      );  
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
