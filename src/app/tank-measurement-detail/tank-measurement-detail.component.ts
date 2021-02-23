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
import { graphic } from 'echarts';

@Component({
  selector: 'app-tank-measurement-detail',
  templateUrl: './tank-measurement-detail.component.html',
  styleUrls: ['./tank-measurement-detail.component.css']
})

export class TankMeasurementDetailComponent implements OnInit {
  @ViewChild('tankMeasurementsWidget') tankMeasurementsWidget: TankMeasurementWidgetComponent;
  options: any;
  theme: string = 'dark';
  hideGraph = true;

  mainDataColor = 'rgba(30,144,255, 0.6)';

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
    return date;
    //return date.substring(0,10);
  }

  loadChartData(data: TankMeasurement[], result: Chart) {
    this.hideGraph = false;
    var currentTank = this.getCurrentTank();
    var currentMeasurementType =this.getCurrentMeasurementType();
    const mainData = [];
    const highData = [];
    const lowData = [];
    const idealData = [];

    data.forEach(m=> {
      const mainArrayDataItem = [new Date(m.tankMeasurementDatetime), m.value];
      const highArrayDataItem = [new Date(m.tankMeasurementDatetime), result.highValue];
      const lowArrayDataITem = [new Date(m.tankMeasurementDatetime), result.lowValue];
      const idealArrayDataItem = [new Date(m.tankMeasurementDatetime), result.idealValue]
      mainData.push(mainArrayDataItem);
      highData.push(highArrayDataItem);
      lowData.push(lowArrayDataITem);
      idealData.push(idealArrayDataItem);
    });
    var colors = ['#5470C6', '#91CC75', '#EE6666'];

    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
          }
      },
      toolbox: {
        feature: {dataZoom: {
            yAxisIndex: 'none'
        },
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
      },
      legend: {
        data: [currentMeasurementType.tankMeasurementTypeName + ', ' + currentMeasurementType.uom, 'High Nominal Threshold', "Low Nominal Threshold"],
        x: 'left',
        y: 'bottom',
        show: true
      },
      title: {
        text: currentMeasurementType.tankMeasurementTypeName + ' of ' + currentTank.tankTypeName,
        x: 'center'
      },
      xAxis: {
        silent: false,
        splitLine: {
          show: false,
        },
        type: 'time',
        name: 'Date',
        nameLocation: 'middle',
        nameGap: 50,
        axisLine: {
          show: true,
          lineStyle: {
              color: colors[0]
          }
        },
      },
      yAxis: {       
        name: currentMeasurementType.tankMeasurementTypeName + ', ' + currentMeasurementType.uom,
        nameLocation: 'middle',
        nameGap: 50,
        axisLine: {
          show: true,
          lineStyle: {
              color: colors[1]
          }
        },
      },
      series: [
        {
          name: currentMeasurementType.tankMeasurementTypeName + ', ' + currentMeasurementType.uom,
          type: 'bar',
          data: mainData,
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.mainDataColor
              },
              {
                offset: 1,
                color: this.mainDataColor
              }
            ])
          },
          animationDelay: (idx) => idx * 10
        },
        {
          name: 'High Nominal Threshold',
          type: 'line',
          data: highData,
          animationDelay: (idx) => idx * 10 + 100,
        },
        {
          name: 'Low Nominal Threshold',
          type: 'line',
          data: lowData,
          animationDelay: (idx) => idx * 10 + 100,
        },
        {
          name: 'Ideal Nominal Threshold',
          type: 'line',
          data: idealData,
          animationDelay: (idx) => idx * 10 + 100,
        },
        {
          name: 'Tank Additions - 1',
          type: 'scatter',
          data: [],
          markLine: {
            label:{
              offset:[10,25],
              align: 'left'
            },
            data: [   
                    [
                      {name: '25 lb - Caustic Soda', xAxis: '2021-02-03', yAxis: 0},
                      {name: 'a', xAxis: '2021-02-03', yAxis: 13},
                    ],
                    [
                      {name: '10 gal - H20', xAxis: '2021-02-03', yAxis: 0},
                      {name: 'a', xAxis: '2021-02-03', yAxis: 11.5},
                    ]
                  ]
          }
        },
        {
          name: 'Tank Additions - 2',
          type: 'scatter',
          data: [],
          markLine: {
            label:{
              offset:[10,25],
              align: 'left',
            },
            data: [   
                    [
                      {name: '110 lb - Caustic Soda', xAxis: '2021-02-09', yAxis: 0, lineStyle: {
                        normal: {
                          type:'solid',
                          color: 'blue',
                        }
                      }},
                      {name: 'a', xAxis: '2021-02-09', yAxis: 13, lineStyle: {
                        normal: {
                          type:'solid',
                          color: 'blue',
                        }
                      }},
                    ]
                  ]
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

  async updateGraph(data: TankMeasurement[]){
    this.http.get<Chart>('/api/' + 'chart/' + this.selectedTankTypeId + "/" + this.selectedTankMeasurementTypeId).subscribe(result => {
      this.loadChartData(data, result);    
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
  }

  dataLoaded(data: TankMeasurement[]){
    this.updateGraph(data);
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
