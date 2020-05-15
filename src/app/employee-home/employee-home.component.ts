import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss'],
})
export class EmployeeHomeComponent implements OnInit {
public employeeDetails: any;
  constructor(public router: Router) { 
    this.employeeDetails = JSON.parse(localStorage.getItem('userDetails'));
  }

  ngOnInit() {}
  logout() {
    localStorage.clear();
    this.router.navigate(['/user/login']);
  }
}
