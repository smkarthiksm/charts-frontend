import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import DailyInventoryChartModel from '../models/DailyInventoryChart';
@Injectable({
  providedIn: 'root'
})
export default class DailyInventoryService {
  apiURL = 'http://localhost:5000/dailyInventory';

  constructor(private http: HttpClient) { }


  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getDailyInventoryByDay(month: number): Observable<Array<DailyInventoryChartModel>> {
    return this.http.get<Array<DailyInventoryChartModel>>(this.apiURL + `/getData?month=${month}&mode=day`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getDailyInventoryByWeek(month: number): Observable<Array<DailyInventoryChartModel>> {
    return this.http.get<Array<DailyInventoryChartModel>>(this.apiURL + `/getData?month=${month}&mode=week`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    console.log(error);
    return throwError(error);
  }
}
