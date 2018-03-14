import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {FormControl} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-highcharts'; 
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {CdkTableModule} from '@angular/cdk/table';


@Component({
 	selector: 'app-root',

	template: `
<div class="container">
      <div class="well" style="margin-top: 30px">
        <div class="col-lg-6 col-center-block" align="center">
          <h3>
          <b> Stock Market Search </b>
          </h3>
        </div>
        <div class="row">
          <form class="col-lg-12 form-horizontal col-center-block">
            <div class="col-lg-3">
              <label for="symbol" class="control-label">
                <b > Enter Stock Ticker Symbol:* </b>
              </label>
            </div>
            <div class="col-lg-6">
              <mat-form-field style="width:100%;">
                <input type="text" class="form-control" [(ngModel)]="symbol" matInput [formControl]="myControl" [matAutocomplete]="auto" (ngModelChange)="fetchAutocomplete()" style="background-color:white" required autofocus/>
              </mat-form-field>
              <mat-autocomplete #auto="matAutocomplete">
                <mat-option *ngFor="let option of options" [value]="option" (click)="setSymbol(option)"> {{ option }} </mat-option>
              </mat-autocomplete>
              <div *ngIf="symbol?.length > 0 && symbol?.trim() === ''">
                Please enter a stock ticker symbol.
              </div>
            </div>
            <div class="col-lg-3">
              <button type="submit" class="btn btn-primary " (click)="onQuery()" [disabled]="symbol.trim() === ''">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Get Quote
              </button>
              <button type="reset" (click)="reset()" class="btn btn-default">
                <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr />

      <mat-tab-group [selectedIndex]="tabIndex" >
        <mat-tab>
          <div class="well">
            <div class="panel panel-default">
              <div class="panel-heading" style="height: 55px;">
                <b style="line-height: 35px;">Favorite List</b>
                <div class="pull-right">
                  <button class="btn btn-default pull-right" (click)="changePanel()" style="margin-left: 8px;">
                    <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                  </button>
                  <button class="btn btn-default pull-right" (click)="refreshFavor()" style="margin-left: 8px;">
                    <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                  </button>
                  <font style="line-height: 35px;">
                    Automatic Refresh:
                  </font>
									<div (click)="autoRefresh()" style="float:right;">
                  <input type="checkbox"  data-toggle="toggle"/>
									</div>
                </div>
              </div>
              <div class="panel-body">
                <div class="col-lg-1">
                  <label style="line-height: 35px;">
                    Sort by
                  </label>
                </div>
                <div class="col-lg-3">
                  <select class="selectpicker show-tick" data-dropup-auto="false" data-size="6">
                    <option> Default </option>
                    <option> Symbol </option>
                    <option> Price </option>
                    <option> Change </option>
                    <option> Change Percent </option>
                    <option> Volume </option>
                  </select>
                </div>
                <div class="col-lg-1">
                  <label style="line-height: 35px;">
                    Order
                  </label>
                </div>
                <div class="col-lg-3">
                  <select class="selectpicker show-tick" data-dropup-auto="false" [disabled]="!upOrDown">
                    <option> Ascending </option>
                    <option> Descending </option>
                  </select>
                </div>
                <table class="table table-hover table-striped">
                  <tr>
                    <td><b> Symbol </b></td>
                    <td><b> Stock Price </b></td>
                    <td><b> Change (Change Percent) </b></td>
                    <td><b> Volume </b></td>
                    <td></td>
                  </tr>
                  <tr *ngFor="let favor of favorStock">
                    <td><a (click)="chooseFavor(favor)">{{favor.symbol}} </a></td>
                    <td> {{favor.lastPrice}} </td>
                    <td> <font [ngStyle]="{'color': favor.change.substring(0,1) === '-' ? 'red' : 'green' }">{{favor.change}} </font><img width='17px' height='17px' [src]="favor.change.substring(0,1) === '-' ? 'http://cs-server.usc.edu:45678/hw/hw8/images/Down.png' : 'http://cs-server.usc.edu:45678/hw/hw8/images/Up.png'" /></td>
                    <td> {{favor.volume}} </td>
                    <td><button class="btn btn-default" (click)="deleteFavor(favor)">
                        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                      </button></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </mat-tab>
        <mat-tab>
          <div class="well">
            <div class="panel panel-default">
              <div class="panel-heading" align="center">
                <b style="line-height: 30px;"> Stock Details </b>
                <button (click)="changePanel()" class="btn btn-default pull-left">
                  <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                </button>   
              </div>
              <div class="panel-body">
                <ul class="nav nav-pills">
                  <li class="active" role="presentation">
                    <a href="#current_stock" data-toggle="tab">
                    <span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>
                    <span class="hidden-xs">&nbsp;Current Stock </span>
                    <span class="visible-xs" style="float:right;">&nbsp;Stock </span>
                    </a>
                  </li>
                  <li role="presentation">
                    <a href="#historical_charts" data-toggle="tab">
                    <span class="glyphicon glyphicon-stats" aria-hidden="true"></span>
                    <span class="hidden-xs">&nbsp;Historical Charts </span>
                    <span class="visible-xs" style="float:right;">&nbsp;Charts </span>
                    </a>
                  </li>
                  <li role="presentation">
                    <a href="#new_feeds" data-toggle="tab">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                    <span class="hidden-xs">&nbsp;New Feeds</span>
                    <span class="visible-xs" style="float:right;">&nbsp;News </span>
                    </a>
                  </li>
                </ul>
                <hr />
                <div class="tab-content">
                  <div class="tab-pane fade in active" id="current_stock">
                    <div class="col-lg-6">
                      <div>
                        <b style="line-height: 35px;margin-left: 15px;"> Stock Details </b>
                        <button (click)="postChart()" class="btn btn-default pull-right" style="margin-bottom: 25px;margin-right: 15px;margin-left: 8px;" [disabled]="!stock.stockInfo">
                          <img src="assets/img/facebook.png" style="width: 20px;height:20px;" />
                        </button>
                        <button (click)="convertCurrentFavor()" class="btn btn-default pull-right" [disabled]="!stock.stockInfo">
                          <span *ngIf="!isFavorStock" class="glyphicon glyphicon-star-empty" aria-hidden="true" style="font-size: 17px;"></span>
                          <span *ngIf="isFavorStock" class="glyphicon glyphicon-star" aria-hidden="true" style="font-size: 17px;color:yellow;"></span>
                        </button>
                      </div>
                      <table class="table table-hover table-striped" *ngIf="stock.stockInfo" height="350px">
                        <tr>
                          <td><b> Stock Ticker Symbol </b></td>
                          <td><span *ngIf="stock">{{stock.stockInfo?.symbol}}</span></td>
                        </tr>
                        <tr>
                          <td><b> Last Price </b></td>
                          <td><span *ngIf="stock">{{stock.stockInfo?.lastPrice}}</span></td>
                        </tr>
                        <tr>
                          <td><b> Change (Change Percent) </b></td>
                          <td><span *ngIf="stock"><font [ngStyle]="{'color': stock.stockInfo?.change.substring(0,1) === '-' ? 'red' : 'green' }">{{stock.stockInfo?.change}}</font><img width='17px' height='17px' [src]="stock.stockInfo?.change.substring(0,1) === '-' ? 'http://cs-server.usc.edu:45678/hw/hw8/images/Down.png' : 'http://cs-server.usc.edu:45678/hw/hw8/images/Up.png'" /></span></td>
                        </tr>
                        <tr>
                          <td><b> Timestamp </b></td>
                          <td><span *ngIf="stock">{{stock.stockInfo?.timeStamp}}</span></td>
                        </tr>
                        <tr>
                          <td><b> Open </b></td>
                          <td><span *ngIf="stock">{{stock.stockInfo?.open}}</span></td>
                        </tr>
                        <tr>
                          <td><b> Previous Close </b></td>
                          <td><span *ngIf="stock">{{stock.stockInfo?.prevClose}}</span></td>
                        </tr>
                        <tr>
                          <td><b> Day's Range </b></td>
                          <td><span *ngIf="stock">{{stock.stockInfo?.range}}</span></td>
                        </tr>
                        <tr>
                          <td><b> Volume </b></td>
                          <td><span *ngIf="stock">{{stock.stockInfo?.volume}}</span></td>
                        </tr>
                      </table>
                      <div *ngIf="!stock.stockInfo" class="progress" style="margin-top:100px;">
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">
                          <span class="sr-only">45% Complete</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <ul class="nav nav-tabs">
                        <li role="presentation" [ngClass]="{'active':true}" (click)="drawStockInfo()">
                          <a href="#chartTab" data-toggle="tab"> Price </a>
                        </li>
                        <li role="presentation" (click)="drawSMA()">
                          <a href="#chartTab" data-toggle="tab"> SMA </a>
                        </li>
                        <li role="presentation" (click)="drawEMA()">
                          <a href="#chartTab" data-toggle="tab"> EMA </a>
                        </li>
                        <li role="presentation" (click)="drawSTOCH()">
                          <a href="#chartTab" data-toggle="tab"> STOCH </a>
                        </li>
                        <li role="presentation" (click)="drawRSI()">
                          <a href="#chartTab" data-toggle="tab"> RSI </a>
                        </li>
                        <li role="presentation" (click)="drawADX()">
                          <a href="#chartTab" data-toggle="tab"> ADX </a>
                        </li>
                        <li role="presentation" (click)="drawCCI()">
                          <a href="#chartTab" data-toggle="tab"> CCI </a>
                        </li>
                        <li role="presentation" (click)="drawBBANDS()">
                          <a href="#chartTab" data-toggle="tab"> BBANDS </a>
                        </li>
                        <li role="presentation" (click)="drawMACD()">
                          <a href="#chartTab" data-toggle="tab"> MACD </a>
                        </li>
                      </ul>
                      <div *ngIf="chartOptions" class="tab-content">
                        <div class="tab-pane fade in active" id="chartTab">
                          <chart [options] = "chartOptions" (load)="saveInstance($event.context)">
                          </chart>
                        </div>
                      </div>
                      <div *ngIf="!chartOptions" class="progress" style="margin-top:50px;">
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">
                          <span class="sr-only">45% Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 tab-pane fade" id="historical_charts">
                    <chart type="StockChart" *ngIf="highstockOptions" [options]="highstockOptions">
                    </chart>
                    <div *ngIf="!highstockOptions" class="progress" style="margin-top:50px;">
                      <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">
                        <span class="sr-only">45% Complete</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 tab-pane fade" id="new_feeds">
                    <div *ngIf="!stock.news" class="progress" style="margin-top:50px;">
                      <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">
                        <span class="sr-only">45% Complete</span>
                      </div>
                    </div>
                    <ul *ngIf="stock.news">
                      <li *ngFor="let link of stock.news.link; let i = index;" style="list-style-type:none;">
                        <div class="well">
                          <div>
                            <a href={{link}} target="_blank">{{link}}</a>
                          </div>
                          <div>
                            <b> Author: {{stock.news.author[i]}}</b>
                          </div>
                          <div>
                            <b> Date: {{stock.news.date[i]}}</b>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>

		
  `,
			styles: [`
			.col-center-block {
				float: none;
				display: block;
				margin-left: auto;
				margin-right: auto;
			}
			.btn-default:focus {
				background-color: #fff;
			}
      chart {
        display: block;
      }
			a:hover{ cursor:pointer;}

`]

})
export class AppComponent 
{
	constructor(public http: Http, private fb: FacebookService) 
	{
		this.favorStock = new Array();
		for(var i = 0, j = localStorage.length - 1; i < localStorage.length, j >= 0; i++, j--)
		{
			var json = localStorage.getItem(localStorage.key(i));
			this.favorStock[j] = JSON.parse(json);
		}
		
		  this.fb.init({
			appId: '314685119012431',
      xfbml: true,
      version: 'v2.11'
		});

	}
	
	postChart() : void
	{		
		this.fb.login()
    .then((response: LoginResponse) => console.log(response))
    .catch((error: any) => console.error(error));
	}
	
	autoSwitch : boolean = false;

	private timer;

	autoRefresh() : void
	{
		this.autoSwitch = !this.autoSwitch;
		if(this.autoSwitch)
		{
			this.timer = setInterval(()=>
			{
				this.refreshFavor();
			},5000)
		}
		else
		{
			if(this.timer != null)
			{
				clearInterval(this.timer);
			}
		}
	}

	blankSymbol : boolean = false;
	
	tabIndex : number = 0;

	changePanel() : void
	{
		if(this.tabIndex == 0)
		{
			this.tabIndex = 1;
		}
		else if(this.tabIndex == 1)
		{
			this.tabIndex = 0;
		}
	}

	reset() : void
	{
		this.tabIndex = 0;
		this.autocomplete.items = [];
	}
	
	refreshFavor() : void
	{
		for(var i = 0; i < this.favorStock.length; i++)
		{
			this.http.get('http://stock.us-west-2.elasticbeanstalk.com/?symbol=' + this.favorStock[i].symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											
											for(var j = 0; j < this.favorStock.length; j++)
											{
												if(this.favorStock[j].symbol == data.json().symbol.toUpperCase())
												{
													this.favorStock[j] = data.json();
													localStorage.setItem(this.favorStock[j].symbol.toUpperCase(), JSON.stringify(data.json()));
												}
											}
											console.log(this.favorStock);
										},
                    err => 
										{
											console.error(err);
										} 
                );  
		}
	}
	
	isFavorStock : boolean = false;

	upOrDowm : boolean = false;

	favorStock : StockInfo[];
	
	stockInfoOpt : Object;
	smaOpt : Object;
	emaOpt : Object;
	stochOpt : Object;
	rsiOpt : Object;
	adxOpt : Object;
	cciOpt : Object;
	bbandsOpt : Object;
	macdOpt : Object;

	highstockOptions : Object;

	selection : string = "DEFAULT";
	
	chartOptions : Object;

	chart : Object = new Object();

  saveInstance(chartInstance)
	{
      this.chart = chartInstance;
  }

	myControl : FormControl = new FormControl();

	stock : Stock = new Stock();

	autocomplete : Autocomplete = new Autocomplete();

	options : string[];

	symbol : string = "";

	drawStockInfo() : void
	{
		this.selection = "STOCK_INFO";
		this.chartOptions = this.stockInfoOpt;
	}

	drawSMA() : void
	{
		this.selection = "SMA";
		this.chartOptions = this.smaOpt;
	}

	drawEMA() : void
	{
		this.selection = "EMA";
		this.chartOptions = this.emaOpt;
	}

	drawSTOCH() : void
	{
		this.selection = "STOCH";
		this.chartOptions = this.stochOpt;
	}

	drawRSI() : void
	{
		this.selection = "RSI";
		this.chartOptions = this.rsiOpt;
	}

	drawADX() : void
	{
		this.selection = "ADX";
		this.chartOptions = this.adxOpt;
	}

	drawCCI() : void
	{
		this.selection = "CCI";
		this.chartOptions = this.cciOpt;
	}

	drawBBANDS() : void
	{
		this.selection = "BBANDS";
		this.chartOptions = this.bbandsOpt;
	}

	drawMACD() : void
	{
		this.selection = "MACD";
		this.chartOptions = this.macdOpt;
	}
	
	onQuery() : void
	{
		this.stock = new Stock();
		this.stockInfoOpt = null;
		this.smaOpt = null;
		this.emaOpt = null;
		this.stochOpt = null;
		this.rsiOpt = null;
		this.adxOpt = null;
		this.cciOpt = null;
		this.bbandsOpt = null;
		this.macdOpt = null;
		this.chartOptions = null;
		this.highstockOptions = null;
		this.isFavorStock = false;
		this.tabIndex = 1;
		
    this.http.get('http://stock.us-west-2.elasticbeanstalk.com/?symbol=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.stock.stockInfo = data.json();
											console.log(this.stock.stockInfo);
											this.stockInfoOpt = {
																							chart : {  zoomType: 'x',
																												 height : 350 
																											},
																							title : { text : this.symbol + ' Stock Price and Volume' },
																							subtitle : 
																													{
																														useHTML : true,
																														text : '<a id="source" href="https://www.alphavantage.co/">' +
																																			 'Source: Alpha Vantage</a>'
																													},
																							series : 
																													[
																															{
																																yAxis: 0,  
																																type : 'area',
																																name : 'Price',
																																data : this.stock.stockInfo.recentPrice
																															},
																															{
																																yAxis: 1,  
																																type : 'column',
																																name : 'Volume',
																																data : this.stock.stockInfo.recentVolume
																															}
																													 ],
																							plotOptions: {  
																															 series: 
																															 {  
																																	 stickyTracking: false  
																															 },  
																															 turboThreshold:0 
																													 },
																							xAxis : 
																											{
																												categories : this.stock.stockInfo.recentDay,
																												labels : 
																												{
																													step : 5,
																													rotation : -45
																												}
																											},
																							yAxis : 
																											[
																												{
																													title : 
																													{
																														text : 'Stock Price'
																													}
																												},
																												{
																													title : 
																													{
																														text : 'Volume'
																													},
																													opposite : true
																												}
																											],
																							colors : 
																												[
																													'#0000FF',
																													'#FF0000'
																												]
																						};
											this.highstockOptions = 	{
																									rangeSelector: {
																																			selected: 1
																																 },
																									title : { text : this.symbol +' Stock Value' },   
																									series : [{
																															name : this.symbol, 
																															data : this.stock.stockInfo.all,
																															tooltip: 
																																				{
																																					valueDecimals: 2
																																				}
																													 }]
																									
																								};
											if(this.selection == "DEFAULT" || this.selection == "STOCK_INFO")
											{
												this.chartOptions = this.stockInfoOpt;
											}
											
											if(localStorage.getItem(this.stock.stockInfo.symbol.toUpperCase()) != null)
											{
												this.isFavorStock = true;
											}
											else
											{
												this.isFavorStock = false;
											}
										},
                    err => 
										{
											console.error(err);
										} 
                );  
		this.http.get('http://stock.us-west-2.elasticbeanstalk.com/SMA?symbol=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.stock.sma = data.json();
											console.log(this.stock.sma);
											this.smaOpt = {
																							chart : {  zoomType: 'x',
																												 height : 350 
																											},
																							title : { text : 'Simple Moving Average (SMA)' },
																							subtitle : 
																													{
																														useHTML : true,
																														text : '<a id="source" href="https://www.alphavantage.co/">' +
																																			 'Source: Alpha Vantage</a>'
																													},
																							series: 	[{
																														name : this.symbol,
																														data : this.stock.sma.sma
																												}],
																							plotOptions: {  
																															 series: 
																															 {  
																																	 stickyTracking: false  
																															 },  
																															 turboThreshold:0 
																													 },
																							xAxis : 
																											{
																												categories : this.stock.sma.recentDay,
																												labels : 
																												{
																													step : 5,
																													rotation : -45
																												}
																											},
																							yAxis : [
																												{
																													title : 
																													{
																														text : 'SMA'
																													}
																												}]
																						};
											if(this.selection == "SMA")
												this.chartOptions = this.smaOpt;
										},
                    err => 
										{
											console.error(err);
										} 
                );  
		this.http.get('http://stock.us-west-2.elasticbeanstalk.com/EMA?symbol=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.stock.ema = data.json();
											console.log(this.stock.ema);
											this.emaOpt = {
																							chart : {  zoomType: 'x',
																												 height : 350 
																											},
																							title : { text : 'Exponential Moving Average (EMA)' },
																							subtitle : 
																													{
																														useHTML : true,
																														text : '<a id="source" href="https://www.alphavantage.co/">' +
																																			 'Source: Alpha Vantage</a>'
																													},
																							series: 	[{
																														name : this.symbol,
																														data : this.stock.ema.ema
																												}],
																							plotOptions: {  
																															 series: 
																															 {  
																																	 stickyTracking: false  
																															 },  
																															 turboThreshold:0 
																													 },
																							xAxis : 
																											{
																												categories : this.stock.ema.recentDay,
																												labels : 
																												{
																													step : 5,
																													rotation : -45
																												}
																											},
																							yAxis : [
																												{
																													title : 
																													{
																														text : 'EMA'
																													}
																												}]
																						};
											if(this.selection == "EMA")
												this.chartOptions = this.emaOpt;
										},
                    err => 
										{
											console.error(err);
										} 
                );
		this.http.get('http://stock.us-west-2.elasticbeanstalk.com/STOCH?symbol=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.stock.stoch = data.json();
											console.log(this.stock.stoch);
											this.stochOpt = {
																							chart : {  zoomType: 'x',
																												 height : 350 
																											},
																							title : { text : 'Stochastic (STOCH)' },
																							subtitle : 
																													{
																														useHTML : true,
																														text : '<a id="source" href="https://www.alphavantage.co/">' +
																																			 'Source: Alpha Vantage</a>'
																													},
																							series: 	[
																													{
																														name : this.symbol + ' STOCH_SlowK',
																														data : this.stock.stoch.slowK
																													},
																													{
																														name : this.symbol + ' STOCH_SlowD',
																														data : this.stock.stoch.slowD
																													}
																												],
																							plotOptions: {  
																															 series: 
																															 {  
																																	 stickyTracking: false  
																															 },  
																															 turboThreshold:0 
																													 },
																							xAxis : 
																											{
																												categories : this.stock.stoch.recentDay,
																												labels : 
																												{
																													step : 5,
																													rotation : -45
																												}
																											},
																							yAxis : [
																												{
																													title : 
																													{
																														text : 'STOCH'
																													}
																												}]
																						};
											if(this.selection == "STOCH")
												this.chartOptions = this.stochOpt;
										},
                    err => 
										{
											console.error(err);
										} 
                );  
		this.http.get('http://stock.us-west-2.elasticbeanstalk.com/RSI?symbol=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.stock.rsi = data.json();
											console.log(this.stock.rsi);
											this.rsiOpt = {
																							chart : {  zoomType: 'x',
																												 height : 350 
																											},
																							title : { text : 'Relative Strength Index (RSI)' },
																							subtitle : 
																													{
																														useHTML : true,
																														text : '<a id="source" href="https://www.alphavantage.co/">' +
																																			 'Source: Alpha Vantage</a>'
																													},
																							series: 	[{
																														name : this.symbol,
																														data : this.stock.rsi.rsi
																												}],
																							plotOptions: {  
																															 series: 
																															 {  
																																	 stickyTracking: false  
																															 },  
																															 turboThreshold:0 
																													 },
																							xAxis : 
																											{
																												categories : this.stock.rsi.recentDay,
																												labels : 
																												{
																													step : 5,
																													rotation : -45
																												}
																											},
																							yAxis : [
																												{
																													title : 
																													{
																														text : 'RSI'
																													}
																												}]
																						};
											if(this.selection == "RSI")
												this.chartOptions = this.rsiOpt;
										},
                    err => 
										{
											console.error(err);
										} 
                );  
		this.http.get('http://stock.us-west-2.elasticbeanstalk.com/ADX?symbol=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.stock.adx = data.json();
											console.log(this.stock.adx);
											this.adxOpt = {
																							chart : {  zoomType: 'x',
																												 height : 350 
																											},
																							title : { text : 'Average Directional movement indeX (ADX)' },
																							subtitle : 
																													{
																														useHTML : true,
																														text : '<a id="source" href="https://www.alphavantage.co/">' +
																																			 'Source: Alpha Vantage</a>'
																													},
																							series: 	[{
																														name : this.symbol,
																														data : this.stock.adx.adx
																												}],
																							plotOptions: {  
																															 series: 
																															 {  
																																	 stickyTracking: false  
																															 },  
																															 turboThreshold:0 
																													 },
																							xAxis : 
																											{
																												categories : this.stock.adx.recentDay,
																												labels : 
																												{
																													step : 5,
																													rotation : -45
																												}
																											},
																							yAxis : [
																												{
																													title : 
																													{
																														text : 'ADX'
																													}
																												}]
																						};
											if(this.selection == "ADX")
												this.chartOptions = this.adxOpt;
										},
                    err => 
										{
											console.error(err);
										} 
                );  
		this.http.get('http://stock.us-west-2.elasticbeanstalk.com/CCI?symbol=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.stock.cci = data.json();
											console.log(this.stock.cci);
											this.cciOpt = {
																							chart : {  zoomType: 'x',
																												 height : 350 
																											},
																							title : { text : 'Commodity Channel Index (CCI)' },
																							subtitle : 
																													{
																														useHTML : true,
																														text : '<a id="source" href="https://www.alphavantage.co/">' +
																																			 'Source: Alpha Vantage</a>'
																													},
																							series: 	[{
																														name : this.symbol,
																														data : this.stock.cci.cci
																												}],
																							plotOptions: {  
																															 series: 
																															 {  
																																	 stickyTracking: false  
																															 },  
																															 turboThreshold:0 
																													 },
																							xAxis : 
																											{
																												categories : this.stock.cci.recentDay,
																												labels : 
																												{
																													step : 5,
																													rotation : -45
																												}
																											},
																							yAxis : [
																												{
																													title : 
																													{
																														text : 'CCI'
																													}
																												}]
																						};
											if(this.selection == "CCI")
												this.chartOptions = this.cciOpt;
										},
                    err => 
										{
											console.error(err);
										} 
                );  
		this.http.get('http://stock.us-west-2.elasticbeanstalk.com/BBANDS?symbol=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.stock.bbands = data.json();
											console.log(this.stock.bbands);
											this.bbandsOpt = {
																							chart : {  zoomType: 'x',
																												 height : 350 
																											},
																							title : { text : 'Bollinger Bands (BBANDS)' },
																							subtitle : 
																													{
																														useHTML : true,
																														text : '<a id="source" href="https://www.alphavantage.co/">' +
																																			 'Source: Alpha Vantage</a>'
																													},
																							series: 	[
																													{
																														name : this.symbol + ' Real Middle Brand',
																														data : this.stock.bbands.middleBand
																													},
																													{
																														name : this.symbol + ' Real Upper Brand',
																														data : this.stock.bbands.upperBand
																													},
																													{
																														name : this.symbol + ' Real Lower Brand',
																														data : this.stock.bbands.lowerBand
																													}
																												],
																							plotOptions: {  
																															 series: 
																															 {  
																																	 stickyTracking: false  
																															 },  
																															 turboThreshold:0 
																													 },
																							xAxis : 
																											{
																												categories : this.stock.bbands.recentDay,
																												labels : 
																												{
																													step : 5,
																													rotation : -45
																												}
																											},
																							yAxis : [
																												{
																													title : 
																													{
																														text : 'BBANDS'
																													}
																												}]
																						};
											if(this.selection == "BBANDS")
												this.chartOptions = this.bbandsOpt;
										},
                    err => 
										{
											console.error(err);
										} 
                );  
		this.http.get('http://stock.us-west-2.elasticbeanstalk.com/MACD?symbol=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.stock.macd = data.json();
											console.log(this.stock.macd);
											this.macdOpt = {
																							chart : {  zoomType: 'x',
																												 height : 350 
																											},
																							title : { text : 'Moving Average Convergence/Divergence (MACD)' },
																							subtitle : 
																													{
																														useHTML : true,
																														text : '<a id="source" href="https://www.alphavantage.co/">' +
																																			 'Source: Alpha Vantage</a>'
																													},
																							series: 	[
																													{
																														name : this.symbol + ' MACD',
																														data : this.stock.macd.macd
																													},
																													{
																														name : this.symbol + ' MACD_Hist',
																														data : this.stock.macd.macdHist
																													},
																													{
																														name : this.symbol + ' MACD_Signal',
																														data : this.stock.macd.macdSignal
																													}
																												],
																							plotOptions: {  
																															 series: 
																															 {  
																																	 stickyTracking: false  
																															 },  
																															 turboThreshold:0 
																													 },
																							xAxis : 
																											{
																												categories : this.stock.macd.recentDay,
																												labels : 
																												{
																													step : 5,
																													rotation : -45
																												}
																											},
																							yAxis : [
																												{
																													title : 
																													{
																														text : 'MACD'
																													}
																												}]
																						};
											if(this.selection == "MACD")
												this.chartOptions = this.macdOpt;
										},
                    err => 
										{
											console.error(err);
										} 
                );  
		this.http.get('http://stock.us-west-2.elasticbeanstalk.com/NEWS?symbol=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.stock.news = data.json();
											console.log(this.stock.news);
										},
                    err => 
										{
											console.error(err);
										} 
                );  

	}

	fetchAutocomplete() : void
	{

		if(this.symbol.length > 0 && this.symbol.trim() === "")
		{
			return;
		}
				this.http.get('http://stock.us-west-2.elasticbeanstalk.com/AUTOCOMPLETE?letters=' + this.symbol)
             .subscribe(
										data => 
										{
											console.log(data);
											this.autocomplete = data.json();
											console.log(this.autocomplete);
											if(this.symbol == this.autocomplete.letter)
												this.options = this.autocomplete.items;

										},
                    err => 
										{
											console.error(err);
										} 
                );  
	}

	setSymbol(option : string) : void
	{
		this.symbol = option.split(" ")[0];
	}

	convertCurrentFavor() : void
	{
		if(this.isFavorStock)
		{
			localStorage.removeItem(this.stock.stockInfo.symbol.toUpperCase());
		}
		else
		{
			localStorage.setItem(this.stock.stockInfo.symbol.toUpperCase(), JSON.stringify(this.stock.stockInfo));
		}
		this.isFavorStock = !this.isFavorStock;
		this.favorStock = new Array();
		for(var i = 0, j = localStorage.length - 1; i < localStorage.length, j >= 0; i++, j--)
		{
			var json = localStorage.getItem(localStorage.key(i));
			this.favorStock[j] = JSON.parse(json);
		}
	}

	chooseFavor(favor : StockInfo) : void
	{
		this.symbol = favor.symbol;
		this.onQuery();
	}

	deleteFavor(favor : StockInfo) : void
	{
		if(this.stock.stockInfo == null)
		{
			this.isFavorStock = false;
		}
		else if(this.stock.stockInfo.symbol.toUpperCase() == favor.symbol)
		{
			this.isFavorStock = false;
		}
		localStorage.removeItem(favor.symbol.toUpperCase());
		this.favorStock = new Array();
		for(var i = 0, j = localStorage.length - 1; i < localStorage.length, j >= 0; i++, j--)
		{
			var json = localStorage.getItem(localStorage.key(i));
			this.favorStock[j] = JSON.parse(json);
		}
	}
}

export class Stock 
{
	stockInfo : StockInfo;
	sma : SMA;
	ema : EMA;
	stoch : STOCH;
	rsi : RSI;
	adx : ADX;
	cci : CCI;
	bbands : BBANDS;
	macd : MACD;
	news : News;
}

export class StockInfo
{
	symbol : string;
  lastPrice : string;
	change : string;
	timeStamp : string;
	open : string;
	prevClose : string;
	range : string;
	volume : string;
	recentPrice : number[];
	recentVolume : number[];
	recentDay : string[];
	all : number[][];
}

export class SMA
{
	sma : number[];
	recentDay : string[];
}

export class EMA
{
	ema : number[];
	recentDay : string[];
}

export class STOCH
{
	slowD : number[];
	slowK : number[];
	recentDay : string[];
}

export class RSI
{
	rsi : number[];
	recentDay : string[];
}

export class ADX
{
	adx : number[];
	recentDay : string[];
}

export class CCI
{
	cci : number[];
	recentDay : string[];
}

export class BBANDS
{
	lowerBand : number[];
	middleBand : number[];
	upperBand : number[];
	recentDay : string[];
}

export class MACD
{
	macdSignal : number[];
	macdHist : number[];
	macd : number[];
	recentDay : string[];
}

export class News
{
	link : string[];
	author : string[];
	date : string[];
}

export class Autocomplete
{
	items : string[];
	letter : string;
}

export class FavorStock
{
	symbol : string;
	price : string;
	change : string;
	volume : string;
}