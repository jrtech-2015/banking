import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { interval } from 'rxjs';
import { restService } from '../services/rest.services';
import { SharedService } from '../services/shared.services';

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
  constructor(public router: Router, private geolocation: Geolocation, public restService: restService,
    public sharedService: SharedService ) { 
    this.employeeDetails = JSON.parse(localStorage.getItem('userDetails'));
  }

  ngOnInit() {}
  logout() {
    localStorage.clear();
    this.router.navigate(['/user/login']);
  }
  // getLocation() {
  //   this.employeeLocation = {};
  //   this.employeeDetails.forEach(data => {
  //     this.employeeId = data.emp_code;
  //   });
  //   this.geolocation.getCurrentPosition().then((response) => {
  //     this.employeeLocation['emp_id'] = this.employeeId;
  //     this.employeeLocation['latitude'] = response.coords.latitude;
  //     this.employeeLocation['longitude'] = response.coords.longitude;
  //     this.employeeLocation['timestamp'] = response.timestamp;
  //    }).catch((error) => {
  //    });
  // }
  liveLocation() {
    this.intervalId = interval(1000 * 10).subscribe(x => {
      this.employeeLocation = {};
    this.employeeDetails.forEach(data => {
      this.employeeId = data.emp_code;
    });
    this.geolocation.getCurrentPosition().then((response) => {
      this.employeeLocation['emp_id'] = this.employeeId;
      this.employeeLocation['latitude'] = response.coords.latitude;
      this.employeeLocation['longitude'] = response.coords.longitude;
      this.employeeLocation['timestamp'] = response.timestamp;
      this.restService.postLiveLocation(this.employeeLocation).subscribe(response => {
        console.log('Live Location response', response);
      });
     }).catch((error) => {
     });
    });
  }
  checkOut() {
    this.employeeLocation = {};
    this.employeeDetails.forEach(data => {
      this.employeeId = data.emp_code;
    });
    this.geolocation.getCurrentPosition().then((response) => {
      this.employeeLocation['emp_id'] = this.employeeId;
      this.employeeLocation['latitude'] = response.coords.latitude;
      this.employeeLocation['longitude'] = response.coords.longitude;
      this.employeeLocation['timestamp'] = response.timestamp;
      this.restService.checkOut(this.employeeLocation).subscribe(response => {
        this.sharedService.toast(response);
      });
     }).catch((error) => {
     });
    this.intervalId.unsubscribe();
  }
  checkIn() {
    this.employeeLocation = {};
    this.employeeDetails.forEach(data => {
      this.employeeId = data.emp_code;
    });
    this.geolocation.getCurrentPosition().then((response) => {
      this.employeeLocation['emp_id'] = this.employeeId;
      this.employeeLocation['latitude'] = response.coords.latitude;
      this.employeeLocation['longitude'] = response.coords.longitude;
      this.employeeLocation['timestamp'] = response.timestamp;
      this.restService.checkIn(this.employeeLocation).subscribe(response => {
        this.sharedService.toast(response);
      });
     }).catch((error) => {
     });
    this.liveLocation();
  }
  getLiveLocation() {
  }
  routeToAttendance() {
    this.router.navigateByUrl('/user/emp-attendance');
  }
}
