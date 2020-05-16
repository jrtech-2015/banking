import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeHomeComponent } from '../employee-home/employee-home.component';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
public userDetails: any;
public loginForm: FormGroup;
public isValidMpin: boolean = false;
public isValidCode: boolean = false;
  constructor(public router: Router, public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      empCode: ['', Validators.required],
      MPin: ['', Validators.required]
  });
  }
  ngOnInit() {
    this.userDetails = [
      {
        "emp_code": "EMP0001",
        "emp_name": "Anand",
        "email_id": "jrtechnologies@gmail.com",
        "emp_branch": "Chennai",
        "password": "4321"
      },
      {
        "emp_code": "EMP0002",
        "emp_name": "Vignesh",
        "email_id": "test@gmail.com",
        "emp_branch": "Mumbai",
        "password": "1234"
      },
      {
        "emp_code": "EMP0003",
        "emp_name": "Kamal",
        "email_id": "test@test.com",
        "emp_branch": "Bangalore",
        "password": "2345"
      },
      {
        "emp_code": "EMP0004",
        "emp_name": "Karthi",
        "email_id": "t@t.com",
        "emp_branch": "Hyderabad",
        "password": "3456"
      },
      {
        "emp_code": "EMP0005",
        "emp_name": "sankar",
        "email_id": "annai.sankar1988@gmail.com",
        "emp_branch": "Chennai",
        "password": "1988"
      },
      {
        "emp_code": "EMP0006",
        "emp_name": "Raj",
        "email_id": "Arputharajannai@gmail.com",
        "emp_branch": "Chennai",
        "password": "9626"
      },
      {
        "emp_code": "EMP0007",
        "emp_name": "Krishna",
        "email_id": "krishna@gmail.com",
        "emp_branch": "Chennai",
        "password": "1111"
      }
    ];
  }
  validateForm(formData) {
    if (formData.valid) {
      var validEmpCode = this.userDetails.filter(data => {
        if(data.emp_code == formData.controls.empCode.value) {
          return data;
        }
      });
      if(validEmpCode.length == 0) {
        this.loginForm.controls.empCode.setErrors({'required': true});
      }
      else {
        var validMPin = validEmpCode.filter(result => {
          if(result.password == formData.controls.MPin.value) {
            return true;
          }
        });
        if(validMPin.length == 0) {
          this.loginForm.controls.MPin.setErrors({'required': true});
        }
        else {
          localStorage.setItem('userDetails', JSON.stringify(validMPin));
          this.loginForm.reset()
          this.router.navigateByUrl('/user/emp-details');
        } 
      }
    }
    else {
      if(formData.controls.empCode.value == "") {
        this.loginForm.controls.empCode.markAsTouched();
      }
      else {
        this.loginForm.controls.MPin.markAsTouched();
      }
    }
  }
}
