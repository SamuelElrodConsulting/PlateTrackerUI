import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TankMeasurementNominal } from 'src/app/models/tank-measurement-nominal';
import { HttpClient } from '@angular/common/http'
import { DataSource } from '@angular/cdk/table';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nominals-widget',
  templateUrl: './nominals-widget.component.html',
  styleUrls: ['./nominals-widget.component.css']
})
export class NominalsWidgetComponent implements OnInit {
  dataSource: TankMeasurementNominal[];
  controls: FormArray;
  httpClient: HttpClient;
  
  public SelectedRow: TankMeasurementNominal = null;
  @Output() selectedNominalChanged = new EventEmitter<TankMeasurementNominal>();

  displayedColumns: string[] =['tankMeasurementTankTypeName', 'tankMeasurementTypeName',
  'lowNominalValue', 'idealNominalValue', 'highNominalValue', 'uom',
  'minimumTestingFrequencyDays', 'idealTestingFrequencyDays',
  'updatedBy', 'datetimeUpdated', 'edit', 'delete' ]
    
  
  
  constructor(http: HttpClient, private modalService: NgbModal, private toastr: ToastrService) {   
    this.httpClient = http;
    this.updateNominalList();
  }

  async updateNominalList() {
    this.httpClient.get<TankMeasurementNominal[]>('/api/' + 'TankMeasurementNominal').subscribe(result => {
      this.dataSource = result;
      console.log(result);
    }, error => console.error(error));
   }

  getLowNominalFormControl() {
    return new FormControl(0, Validators.required)
  }

  async selectRow(row: TankMeasurementNominal) {

  }

  async edit(row: TankMeasurementNominal) {
    var rowToToggleValue =!row.highlighted;

    this.dataSource.forEach(r => {
      r.highlighted = false;
    });

    row.highlighted = rowToToggleValue;

    console.log( row)
    this.selectedNominalChanged.next(row);
  }
  
  async delete(row: TankMeasurementNominal, content: any) {
    this.edit(row);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.toastr.error('Nominal Deleted!', 'Nominal Successfully Deleted!');
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
