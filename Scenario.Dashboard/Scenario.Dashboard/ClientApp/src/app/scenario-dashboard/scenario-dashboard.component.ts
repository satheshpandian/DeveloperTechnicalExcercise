import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scenario } from '../scenario';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ScenarioService } from '../scenario.service';
import { FormGroup, FormControl, Validators   } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { timer } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-scenario-dashboard',
  templateUrl: './scenario-dashboard.component.html'
})
export class ScenarioDashboardComponent implements OnInit, AfterViewInit {
  public scenarios: Scenario[];
  public networkLayerIDs: number[];
  public marketIDs: number[];
  public NumOfMonths: number[];
  private apiService: ScenarioService;

 public scenariosForm: FormGroup;
 public ctlNetworkLayerID: FormControl;
 public ctlMarketID: FormControl;
 public ctlNumOfMonths: FormControl;

 public selectedNetworkLayerID: number;
 public selectedMarketID: number;
 public selectedNumOfMonths: number;
 list: number[] = [];
 // Progress Bar//
 public displayProgress = false;
  color: ThemePalette = 'primary';
  value = 0;
  bufferValue = 0;

  // Mat Table //
  displayedColumns: string[] = ['name', 'surname', 'forename', 'sampleDate', 'creationDate'];
  public dataSource = new MatTableDataSource<Scenario>();
  public pageSize: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(apiService: ScenarioService) {
    this.apiService = apiService;
    this.pageSize = 10;
  }
  ngOnInit(): void {
    this.scenariosForm = new FormGroup({
      ctlNetworkLayerID: new FormControl('', [Validators.required]),
      ctlMarketID: new FormControl('', [Validators.required]),
      ctlNumOfMonths: new FormControl('', [Validators.required])
    });
    this.getNetworkLayers();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getNetworkLayers() {
    this.apiService.getNetWorkLayers('getNetworkLayers').subscribe((res: number[]) => {
      this.networkLayerIDs = res;
      this.hideProgressBar();
    });
  }

  networklayerchanged(networklayerId) {
    this.dataSource.data = [];
    this.marketIDs = null;
    this.NumOfMonths = null;
    this.selectedNumOfMonths = 0;
    this.displayProgressBar();
    this.apiService.getMarkets('getMarkets', networklayerId).subscribe((res: number[]) => {
      this.marketIDs = res;
      this.hideProgressBar();
    });
  }

  marketIDchanged(marketId) {
    this.dataSource.data = [];
    this.NumOfMonths = null;
    this.selectedNumOfMonths = 0;
    this.displayProgressBar();
    this.apiService.getNumOfMonths('getNumOfMonths', marketId).subscribe((res: number[]) => {
      this.NumOfMonths = res;
      this.hideProgressBar();
    });
  }

  numOfMonthschanged(numOfMonths) {
    this.dataSource.data = [];
    this.displayProgressBar();
    this.apiService.getScenarios('getScenarios', this.selectedNetworkLayerID, this.selectedMarketID,
    numOfMonths).subscribe((res: Scenario[]) => {
      this.dataSource.data = res;
      this.hideProgressBar();
    });
  }

  oberserableTimer() {
    this.displayProgress = true;
    const source = timer(1000, 200);
    const abc = source.subscribe(val => {
      console.log('counter:' + val);
      this.bufferValue += val;
      if (this.bufferValue >= 100) {
        this.hideProgressBar();
        abc.unsubscribe();
      }
    });
  }

  displayProgressBar() {
    this.value = 0;
      this.bufferValue = 0;
        this.displayProgress = true;
        //this.oberserableTimer();

  }
  hideProgressBar() {
    this.value = 100;
      this.bufferValue = 100;
        this.displayProgress = false;

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.scenariosForm.controls[controlName].hasError(errorName);
  }
}
