export class TankMeasurementNominal {
    tankMeasurementNominalId: number;
    TankTypeId: number;
    TankTypeName: string
    tankMeasurementTypeId: number;
    tankMeasurementTypeName: string;
    lowNominalValue: number;
    idealNominalValue: number;
    highNominalValue: number;
    minimumTestingFrequencyDays: number;
    idealTestingFrequencyDays: number;
    createdBy: string;
    datetimeCreated: Date;
    updatedBy: string;
    datetimeUpdated: Date;
    uom: string;

    highlighted:boolean = false;
}