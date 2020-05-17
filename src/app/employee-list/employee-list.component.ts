import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  public employeeDetails: any;

  constructor(public router: Router) { 
    this.employeeDetails = JSON.parse(localStorage.getItem('userDetails'));
  }

  ngOnInit() {}
  routeToDetails() {
    this.router.navigateByUrl('/user/emp-details');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/user/login']);
  }
}
