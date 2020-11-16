import { TestBed, getTestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { ScenarioService } from './scenario.service';
import { Scenario } from './scenario';
import { InjectionToken } from '@angular/core';
import { of } from 'rxjs';
const BASE_URL = new InjectionToken<string>('BaseUrl');

const scenarioServiceStub = {
  getScenarios(path: string, networklayerid: number, marketId: number, numOfMonths: number) {
    return of(  [
      new Scenario(),
      new Scenario()
    ]);
  }
};
let injector;
  let service: ScenarioService;
  let httpMock: HttpTestingController;
describe('ScenarioService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{providers: [{provide: ScenarioService, useValue: scenarioServiceStub}]},
       {providers: [{provide: BASE_URL, useValue: 'http://localhost'}]}]
    });

    injector = getTestBed();
    service = injector.get(ScenarioService);
    httpMock = injector.get(HttpTestingController);
  });
});
