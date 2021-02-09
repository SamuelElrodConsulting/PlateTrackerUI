import { Component, Inject, OnInit } from '@angular/core';
import { TankMeasurementType } from '../models/tank-measurement-type';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tank-measurment-types-component',
  templateUrl: './tank-measurment-types-component.component.html',
  styleUrls: ['./tank-measurment-types-component.component.css']
})
export class TankMeasurmentTypesComponentComponent implements OnInit {
  public tankMeasurementTypes: TankMeasurementType[];
  displayedColumns: string[] = ['tankMeasurementTypeName', 'tankMeasurementTypeDescription', 'uom', 'datetimeUpdated', 'edit', 'delete'];

  newTankMeasurementName = '';
  newTankMeasurementDescription = '';
  newUOM = '';

  updateTankMeasurementName = '';
  updateTankMeasurementDescription = '';
  updateTankMeasurementTypeId: number = null;
  updateUOM = '';
  
  hideUpdateMeasurementTypeForm = true;


  constructor(private http: HttpClient, private toastr: ToastrService, private modalService: NgbModal) {
    this.updateMeasurementTypesList();
  }

  updateMeasurementTypesList() {
    this.http.get<TankMeasurementType[]>('/api/TankMeasurementType').subscribe(result => {
      this.tankMeasurementTypes = result;
    }, error => console.error(error));
  }

  addMeasurementType() {
    var newTankMeasurementType = new TankMeasurementType();
    newTankMeasurementType.tankMeasurementTypeName = this.newTankMeasurementName;
    newTankMeasurementType.tankMeasurementTypeDescription = this.newTankMeasurementName;
    newTankMeasurementType.uom = this.newUOM;

    this.http.post<TankMeasurementType>('/api/TankMeasurementType', newTankMeasurementType).subscribe(result => {
      this.toastr.success('SUCCESS', 'New Tank Measurement Type Added');
      this.updateMeasurementTypesList();
    }, error => this.toastr.error('ERROR', 'New Tank Measurement Type NOT Added.'));
  }

  updateMeasurementType() {
    var updateTankMeasurementType = new TankMeasurementType();
    updateTankMeasurementType.tankMeasurementTypeName = this.updateTankMeasurementName;
    updateTankMeasurementType.tankMeasurementTypeDescription = this.updateTankMeasurementDescription;
    updateTankMeasurementType.uom = this.updateUOM;
    updateTankMeasurementType.tankMeasurementTypeId = this.updateTankMeasurementTypeId;

    this.http.put<TankMeasurementType>('/api/TankMeasurementType', updateTankMeasurementType).subscribe(result => {
      this.toastr.success('SUCCESS', 'Tank Measurement Type Updated');
      this.updateMeasurementTypesList();
    }, error => this.toastr.error('ERROR', 'Tank Measurement Type NOT Updated.'));
  }

  async deleteMeasurementType(id): Promise<boolean> {
    var result = await this.http.delete<boolean>('/api/TankMeasurementType/' + id).toPromise();
    return result;
  }

  async edit(row: TankMeasurementType) {
    var rowToToggleValue =!row.highlighted;

    this.tankMeasurementTypes.forEach(r => {
      r.highlighted = false;
    });

    row.highlighted = rowToToggleValue;

    if(row.highlighted) {
      this.hideUpdateMeasurementTypeForm = false;
      this.updateTankMeasurementName = row.tankMeasurementTypeName;
      this.updateTankMeasurementDescription = row.tankMeasurementTypeDescription;
      this.updateUOM = row.uom;
      this.updateTankMeasurementTypeId = row.tankMeasurementTypeId;
    } else {
      this.hideUpdateMeasurementTypeForm = true;
    }
  }
  
  async delete(row: TankMeasurementType, content: any) {
    this.edit(row);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.deleteMeasurementType(row.tankMeasurementTypeId).then(deleted => {
        if (deleted) {
          this.toastr.error('Nominal Deleted!', 'Tank Measurement Type Successfully Deleted!');
        } else {
          this.toastr.error('ERROR!', 'Tank Measurement Type NOT Deleted!');
        }
        this.updateMeasurementTypesList();
      });
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
