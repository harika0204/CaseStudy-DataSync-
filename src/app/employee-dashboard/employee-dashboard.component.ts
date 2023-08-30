import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeModel } from '../shared/model/employee-dashboard.model';
import { CustomvalidationService } from '../shared/customvalidation.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeData !: any;
  employeeObj : EmployeeModel = new EmployeeModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  role:string =""
  constructor(private api: ApiService,
    private formBuilder: FormBuilder,private customValidatorService : CustomvalidationService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [null,[Validators.required,Validators.minLength(5),Validators.maxLength(35)]],
      lastName: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email]],
      dob: ['',[Validators.required,this.customValidatorService.MinAgeValidation(24, 20)]],
      admission: ['', [Validators.required,this.customValidatorService.MaxAgeValidation(72,1)]],
      practicingArea: [null, [Validators.required, Validators.maxLength(100)]],
      practiceLocation: [null, [Validators.required]],
      position: [null, [Validators.required]]
    })
    this.getEmployeeDetails();
    
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
 
  postEmployeeDetails() {
    this.employeeObj.FirstName = this.formValue.value.firstName;
     this.employeeObj.LastName = this.formValue.value.lastName;
     this.employeeObj.Email = this.formValue.value.email;
     this.employeeObj.Dob = this.formValue.value.dob;
     this.employeeObj.Admission = this.formValue.value.admission;
     this.employeeObj.PracticingArea = this.formValue.value.practicingArea;
     this.employeeObj.PracticeLocation = this.formValue.value.practiceLocation;
     this.employeeObj.Position = this.formValue.value.position;
    this.api.PostEmployee(this.employeeObj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
      })
  }
  getEmployeeDetails() {
    this.api.GetEmployees()
    .subscribe(res=>{
      this.employeeData = res;
      
    })
  }
  editEmployeeDetail(){
     this.employeeObj.FirstName = this.formValue.value.firstName;
     this.employeeObj.LastName = this.formValue.value.lastName;
     this.employeeObj.Email = this.formValue.value.email;
     this.employeeObj.Dob = this.formValue.value.dob;
     this.employeeObj.Admission = this.formValue.value.admission;
     this.employeeObj.PracticingArea = this.formValue.value.practicingArea;
     this.employeeObj.PracticeLocation = this.formValue.value.practiceLocation;
     this.employeeObj.Position = this.formValue.value.position;
    this.api.UpdateEmployee(this.employeeObj)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
    })
  }
  onEdit(row : any){
    this.employeeObj.Id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['admission'].setValue(row.admission);
    this.formValue.controls['practicingArea'].setValue(row.practicingArea);
    this.formValue.controls['practiceLocation'].setValue(row.practiceLocation);
    this.formValue.controls['position'].setValue(row.position);
    this.showUpdate = true;
    this.showAdd = false;
  }


}
