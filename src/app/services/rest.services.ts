import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class restService {
  constructor(private http: HttpClient) {

  }
  
  checkIn(param){
    return this.http.post(environment.baseUrl+"api_get_office_check_in.php", param, {responseType: 'text'});
  }
  checkOut(param) {
    return this.http.post(environment.baseUrl+"api_get_office_check_out.php", param, {responseType: 'text'});
  }
  postLiveLocation(param) {
    return this.http.post(environment.baseUrl+"api_post_live_location.php", param, {responseType: 'text'});
  }
}