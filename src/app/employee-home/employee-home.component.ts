import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { interval } from 'rxjs';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss'],
})
export class EmployeeHomeComponent implements OnInit {
public employeeDetails: any;
public employeeLocation: any;
public employeeId: any;
public  intervalId: any;
  constructor(public router: Router, private geolocation: Geolocation) { 
    this.employeeDetails = JSON.parse(localStorage.getItem('userDetails'));
  }

  ngOnInit() {}
  logout() {
    localStorage.clear();
    this.router.navigate(['/user/login']);
  }
  getLocation() {
    this.employeeLocation = {};
    this.employeeDetails.forEach(data => {
      this.employeeId = data.emp_code;
    });
    this.geolocation.getCurrentPosition().then((response) => {
      this.employeeLocation['emp_id'] = this.employeeId;
      this.employeeLocation['latitude'] = response.coords.latitude;
      this.employeeLocation['longitude'] = response.coords.longitude;
      this.employeeLocation['timestamp'] = response.timestamp;
      console.log('Employee Live Location Every 10 sec.', this.employeeLocation);
     }).catch((error) => {
     });
  }
  checkIn() {
    this.getLocation();
    this.intervalId = interval(1000 * 10).subscribe(x => {
      this.getLocation();
    });
  }
  checkOut() {
    this.getLocation();
    this.intervalId.unsubscribe();
  }
}
