export class TankType {
    TankMeasurementId:number;
    TankMeasurementTypeId:number;
    TankeMeasurementTypeName:string;
    TankTypeId:number;
    TankTypeName:string;
    TankMeasurementDescription: string;
    Value:number;
    Notes:string;
    TankMeasurementEmployeeId:number;
    EmployeeName: string;
    TankMeasurementDatetime:Date;
    DatetimeCreated:Date;
    DatetimeUpdated:Date;
    Deleted:Boolean;
    CreatedBy:string;
    UpdatedBy:string;
    UOM:string;

    highlighted = false;
}