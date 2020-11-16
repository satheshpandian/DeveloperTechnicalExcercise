
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  http: HttpClient;
  baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'scenario/';
    console.log('_baseUrl:' + baseUrl);
  }

  getNetWorkLayers(path: string): Observable<any> {
    return this.http.get(this.baseUrl + path);
  }
  getMarkets(path: string, networklayerid: number): Observable<any> {
    return this.http.get(this.baseUrl + path + '/' + networklayerid);
  }

  getNumOfMonths(path: string, marketId: number): Observable<any> {
    return this.http.get(this.baseUrl + path + '/' + marketId);
  }

  getScenarios(path: string, networklayerid: number, marketId: number, numOfMonths: number): Observable<any> {
    return this.http.get(this.baseUrl + path + '/' + networklayerid + '/' + marketId + '/' + numOfMonths);
  }
}
