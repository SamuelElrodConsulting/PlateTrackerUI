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


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'tankMeasurementTypes', component: TankMeasurmentNominalsComponent },
  { path: 'tankMeasurementNominals', component: TankMeasurmentNominalsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TankMeasurmentTypesComponentComponent,
    HomeComponent,
    TankMeasurmentNominalsComponent,
    NominalsWidgetComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), HttpClientModule, FormsModule, BrowserAnimationsModule,
    MatTableModule, MatSortModule, MatIconModule, NgbModule, MatFormFieldModule, MatFormFieldModule,
    MatSelectModule, MatInputModule, ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
