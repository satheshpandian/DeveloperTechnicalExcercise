import { async, ComponentFixture, TestBed, getTestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScenarioService } from '../scenario.service';
import { ScenarioDashboardComponent } from './scenario-dashboard.component';
import { Observable, of } from 'rxjs';
import { Scenario } from '../scenario';
import { MatCardModule, MatPaginator, MatProgressBarModule, MatSelectModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const dummyScenarios = new Observable(
  observer => {
    observer.next('sathesh');
    observer.next('Arun');
    observer.complete();
  }
);
const scenarioServiceStub = {
  getScenarios(path: string, networklayerid: number, marketId: number, numOfMonths: number) {
    return of( dummyScenarios);
  },
  getNetWorkLayers() {
  return of([0, 1]);
  },
  getMarkets(path: string, networklayerId: number) {
    return of([0, 1]);
  },
  getNumOfMonths(path: string, marketId: number) {
    return of([12, 24]);
  }
};

describe('ScenarioDashboardComponent', () => {
  let component: ScenarioDashboardComponent;
  let fixture: ComponentFixture<ScenarioDashboardComponent>;

  beforeEach(async(() => {
    let injector;
    let service: ScenarioService;

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatCardModule,
        MatTooltipModule,
        MatTableModule,
        MatProgressBarModule,
        HttpClientModule,
        RouterModule.forRoot([
          { path: '', component: ScenarioDashboardComponent, pathMatch: 'full' },
          { path: 'scenario-dashboard', component: ScenarioDashboardComponent },
        ])
         ],
      declarations: [ ScenarioDashboardComponent, MatPaginator ],
      providers: [
        { provide: ScenarioService, useValue: scenarioServiceStub }
      ]
    })
    .compileComponents();

    injector = getTestBed();
    service = injector.get(ScenarioService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#should create', () => {
    expect(component).toBeTruthy();
  });
  describe('#ngOnInit', () => {
    it('should load the form controls', () => {
      component.ngOnInit();
    });
  });
  it('#should work with constructor', inject([ScenarioService], (scenarioService: ScenarioService) => {
    scenarioService.getNetWorkLayers('getScenarios').subscribe(numbers => {
      expect(numbers.length).toBe(2);
    });
}));
describe('#networklayerchanged', () => {
  it('should return MarketIDs', () => {
    component.networklayerchanged(1);
    expect(component.marketIDs.length).toBe(2);
  });
});
describe('#marketIDchanged', () => {
  it('should return Number of Months', () => {
    component.marketIDchanged(1);
    expect(component.NumOfMonths.length).toBe(2);
  });
});

describe('#numOfMonthschanged', () => {
  it('should return Scenarios', () => {
    component.selectedMarketID = 1;
    component.selectedNetworkLayerID = 1;
    component.numOfMonthschanged(12);
  });
});
});
