import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import {map} from 'rxjs/operators'
import { EmployeeModel } from './model/employee-dashboard.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService{

  public loginAPIUrl : string = "https://localhost:44390/api/Login/";
  public employeeAPIUrl : string = "https://localhost:44390/api/Employee/";
  constructor(private _http : HttpClient) { }

  PostEmployee(data : any){
    return this._http.post<any>(`${this.employeeAPIUrl}add_employee`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
 
  UpdateEmployee(data : any){
    return this._http.put<any>(`${this.employeeAPIUrl}update_employee`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetEmployees(){
    return this._http.get<any>(`${this.employeeAPIUrl}get_all_employees`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  signUp(empObj : any){
    //return this._http.post<any>(this.loginAPIUrl+"signup",empObj)
    return this._http.post<any>(`${this.loginAPIUrl}signup`,empObj)
  }
  login(empObj:any){
    return this._http.post<any>(`${this.loginAPIUrl}login`,empObj)
  }
}
