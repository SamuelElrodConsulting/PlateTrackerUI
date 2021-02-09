import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TankMeasurmentTypesComponentComponent } from './tank-measurment-types-component/tank-measurment-types-component.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { TankMeasurmentNominalsComponent } from './tank-measurement-nominals/tank-measurement-nominals.component';
import { NominalsWidgetComponent } from './widgets/nominals-widget/nominals-widget.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { TankMeasurementComponent } from './tank-measurement/tank-measurement.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TankMeasurementWidgetComponent } from './widgets/tank-measurement-widget/tank-measurement-widget.component';
import { TankMeasurementDetailComponent } from './tank-measurement-detail/tank-measurement-detail.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LineComponent } from './line/line.component';
import { LineTypeComponent } from './line-type/line-type.component';
import { LineTankTypeComponent } from './line-tank-type/line-tank-type.component';
import { LineWidgetComponent } from './widgets/line-widget/line-widget.component';
import { LineTypeWidgetComponent } from './widgets/line-type-widget/line-type-widget.component';
import { LineTankTypeWidgetComponent } from './widgets/line-tank-type-widget/line-tank-type-widget.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'tankMeasurementTypes', component: TankMeasurmentTypesComponentComponent },
  { path: 'tankMeasurementNominals', component: TankMeasurmentNominalsComponent},
  { path: 'tankMeasurement', component: TankMeasurementComponent},
  { path:'tankMeasurementDetail', component:TankMeasurementDetailComponent},
  { path:'line', component:LineComponent},
  { path:'lineType', component:LineTypeComponent},
  { path:'lineTankType', component:LineTankTypeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TankMeasurmentTypesComponentComponent,
    HomeComponent,
    TankMeasurmentNominalsComponent,
    NominalsWidgetComponent,
    TankMeasurementComponent,
    TankMeasurementWidgetComponent,
    TankMeasurementDetailComponent,
    LineComponent,
    LineTypeComponent,
    LineTankTypeComponent,
    LineWidgetComponent,
    LineTypeWidgetComponent,
    LineTankTypeWidgetComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), HttpClientModule, FormsModule, BrowserAnimationsModule,
    MatTableModule, MatSortModule, MatIconModule, NgbModule, MatFormFieldModule, MatFormFieldModule,
    MatSelectModule, MatInputModule, ToastrModule.forRoot(),
    MatDatepickerModule, MatNativeDateModule, NgxChartsModule, MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
