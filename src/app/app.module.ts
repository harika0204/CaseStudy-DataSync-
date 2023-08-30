import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ApiService } from './shared/api.service';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';

import { CommonModule } from '@angular/common';
import { CustomvalidationService } from './shared/customvalidation.service';




@NgModule(
  {
    declarations: [
      AppComponent,
      EmployeeDashboardComponent,
      LoginComponent,
      SignupComponent,
     
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      CommonModule
    ],
    providers: [ApiService,CustomvalidationService],
    bootstrap: [AppComponent]
  }
)
export class AppModule { }

