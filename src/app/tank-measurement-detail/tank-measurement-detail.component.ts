import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { TankMeasurementNominal } from '../models/tank-measurement-nominal';
import { TankType } from '../models/tank-measurement-tank-type';
import { TankMeasurementType } from '../models/tank-measurement-type';
import { TankMeasurementWidgetComponent } from '../widgets/tank-measurement-widget/tank-measurement-widget.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraphInfo } from '../models/graphInfo';
import { GraphSeriesItem } from '../models/graphSeriesItem';
import { TankMeasurement } from '../models/tank-measurement';
import { Chart } from '../models/chart';

@Component({
  selector: 'app-tank-measurement-detail',
  templateUrl: './tank-measurement-detail.component.html',
  styleUrls: ['./tank-measurement-detail.component.css']
})

export class TankMeasurementDetailComponent implements OnInit {
  dataSource: any[];
  //[view]="view"
  view: any[] = [1200, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  yAxisLabel: string = '';
  timeline: boolean = true;
  legendPosition: string = 'below';
  hideGraph: boolean = true;
  showGridLines: boolean = true;
  showRefLines:boolean = true;

  referenceLines: any[] = [];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#E44D25', '#7aa3e5', '#a8385d', '#aae3f5']
  };

 
  graphTitle='';

  @ViewChild('tankMeasurementsWidget') tankMeasurementsWidget: TankMeasurementWidgetComponent;

  currentTank: TankType;
  currentMeasurement: TankMeasurementType;

  selectedTankTypeId: number;
  selectedTankMeasurementTypeId: number;

  tankTypes: TankType [];
  measurementTypes: TankMeasurementType[];

  constructor(private http: HttpClient, private toastr: ToastrService) {   
    http.get<TankMeasurementType[]>('/api/' + 'TankMeasurementType').subscribe(result => {
      this.measurementTypes = result;
    }, error => console.error(error));

    http.get<TankType[]>('/api/' + 'TankType').subscribe(result => {
      this.tankTypes = result;
    }, error => console.error(error));
  }

  getCurrentMeasurementType(): TankMeasurementType {
    for (var i = 0; i < this.measurementTypes.length; i++) {
      if(this.measurementTypes[i].tankMeasurementTypeId === this.selectedTankMeasurementTypeId) {
        return this.measurementTypes[i];
      }
    }
  }

  getCurrentTank(): TankType {
    for (var i = 0; i < this.tankTypes.length; i++) {
      if(this.tankTypes[i].tankTypeId === this.selectedTankTypeId) {
        return this.tankTypes[i];
      }
    }
  }

  getFormattedDate(date) {
    /*debugger;
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;*/
    return date.substring(0,10);
  }


  async updateGraph(data: TankMeasurement[]){
    this.referenceLines = [];

    this.http.get<Chart>('/api/' + 'chart/' + this.selectedTankTypeId + "/" + this.selectedTankMeasurementTypeId).subscribe(result => {
      var currentTank = this.getCurrentTank();
      var currentMeasurementType =this.getCurrentMeasurementType();
  
      var highNominalGraph = new GraphInfo();
      highNominalGraph.name = 'High Nominal Value';
      highNominalGraph.series = [];

      var highNominalStartValue = new GraphSeriesItem();
      highNominalStartValue.name = this.getFormattedDate(result.chartStartDate);
      highNominalStartValue.value = result.highValue;

      var highNominalEndValue = new GraphSeriesItem();
      highNominalEndValue.name = this.getFormattedDate(result.chartEndDate);
      highNominalEndValue.value = result.highValue;

      highNominalGraph.series.push(highNominalStartValue);
      highNominalGraph.series.push(highNominalEndValue);

      var lowNominalGraph = new GraphInfo();
      lowNominalGraph.name = 'Low Nominal Value';
      lowNominalGraph.series = [];

      var lowNominalStartValue = new GraphSeriesItem();
      lowNominalStartValue.name = this.getFormattedDate(result.chartStartDate);
      lowNominalStartValue.value = result.lowValue;

      var lowNominalEndValue = new GraphSeriesItem();
      lowNominalEndValue.name = this.getFormattedDate(result.chartEndDate);
      lowNominalEndValue.value = result.lowValue;

      lowNominalGraph.series.push(lowNominalStartValue);
      lowNominalGraph.series.push(lowNominalEndValue);

      var graph = new GraphInfo();
      graph.name = currentMeasurementType.tankMeasurementTypeName + ' of ' + currentTank.tankTypeName;
      this.graphTitle = graph.name;
      this.xAxisLabel = 'Date';
      this.yAxisLabel = currentMeasurementType.tankMeasurementTypeName + ', ' + currentMeasurementType.uom;
  
      graph.series = [];
  
      data.forEach(m=> {
        var item = new GraphSeriesItem();
        item.name = this.getFormattedDate(m.tankMeasurementDatetime);
        item.value = m.value;
        graph.series.push(item);
  
      });

      var graphSeriesWrapper = [];
      graphSeriesWrapper.push(graph);
      graphSeriesWrapper.push(highNominalGraph);
      graphSeriesWrapper.push(lowNominalGraph);
      //this.referenceLines.push(highNominalGraph);
      //this.referenceLines.push(lowNominalGraph);
      this.dataSource = graphSeriesWrapper;
      this.hideGraph = false;
      
    }, 
    error => console.error(error));

  }
  async loadDataFromTankSelection(value: MatSelectChange) {
    this.selectedTankTypeId = value.value;   
    if(!this.selectedTankMeasurementTypeId) {
      this.tankMeasurementsWidget.loadDataByTankType(value.value);
    } else {
      this.tankMeasurementsWidget.loadDataByTankTypeAndMeasurementType(value.value, this.selectedTankMeasurementTypeId);
    }
  }

  async loadDataFromMeasurementTypeSelection(value: MatSelectChange) {
    this.selectedTankMeasurementTypeId = value.value;
    if(this.selectedTankTypeId) {
      await this.tankMeasurementsWidget.loadDataByTankTypeAndMeasurementType(this.selectedTankTypeId, value.value);
    }
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.tankMeasurementsWidget.clearData();
  }

  dataLoaded (data: TankMeasurement[]){
    console.log('dataload received event from widget');

    this.updateGraph(data);
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }


}
