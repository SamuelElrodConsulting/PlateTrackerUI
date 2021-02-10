export class TankType {
    tankMeasurementId:number;
    tankMeasurementTypeId:number;
    tankeMeasurementTypeName:string;
    tankTypeId:number;
    tankTypeName:string;
    tankMeasurementDescription: string;
    value:number;
    notes:string;
    tankMeasurementEmployeeId:number;
    employeeName: string;
    tankMeasurementDatetime:Date;
    datetimeCreated:Date;
    datetimeUpdated:Date;
    deleted:Boolean;
    createdBy:string;
    updatedBy:string;
    uom:string;

    highlighted = false;
}