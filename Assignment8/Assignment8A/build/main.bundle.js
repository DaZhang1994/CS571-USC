webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* unused harmony export Stock */
/* unused harmony export StockInfo */
/* unused harmony export SMA */
/* unused harmony export EMA */
/* unused harmony export STOCH */
/* unused harmony export RSI */
/* unused harmony export ADX */
/* unused harmony export CCI */
/* unused harmony export BBANDS */
/* unused harmony export MACD */
/* unused harmony export News */
/* unused harmony export Autocomplete */
/* unused harmony export FavorStock */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.isFavorStock = false;
        this.upOrDowm = false;
        this.selection = "DEFAULT";
        this.chart = new Object();
        this.myControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]();
        this.stock = new Stock();
        this.autocomplete = new Autocomplete();
        this.symbol = "";
        this.favorStock = new Array();
        for (var i = 0, j = localStorage.length - 1; i < localStorage.length, j >= 0; i++, j--) {
            var json = localStorage.getItem(localStorage.key(i));
            this.favorStock[j] = JSON.parse(json);
        }
    }
    AppComponent.prototype.saveInstance = function (chartInstance) {
        this.chart = chartInstance;
    };
    AppComponent.prototype.drawStockInfo = function () {
        this.selection = "STOCK_INFO";
        this.chartOptions = this.stockInfoOpt;
    };
    AppComponent.prototype.drawSMA = function () {
        this.selection = "SMA";
        this.chartOptions = this.smaOpt;
    };
    AppComponent.prototype.drawEMA = function () {
        this.selection = "EMA";
        this.chartOptions = this.emaOpt;
    };
    AppComponent.prototype.drawSTOCH = function () {
        this.selection = "STOCH";
        this.chartOptions = this.stochOpt;
    };
    AppComponent.prototype.drawRSI = function () {
        this.selection = "RSI";
        this.chartOptions = this.rsiOpt;
    };
    AppComponent.prototype.drawADX = function () {
        this.selection = "ADX";
        this.chartOptions = this.adxOpt;
    };
    AppComponent.prototype.drawCCI = function () {
        this.selection = "CCI";
        this.chartOptions = this.cciOpt;
    };
    AppComponent.prototype.drawBBANDS = function () {
        this.selection = "BBANDS";
        this.chartOptions = this.bbandsOpt;
    };
    AppComponent.prototype.drawMACD = function () {
        this.selection = "MACD";
        this.chartOptions = this.macdOpt;
    };
    AppComponent.prototype.onQuery = function () {
        var _this = this;
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
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/?symbol=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.stock.stockInfo = data.json();
            console.log(_this.stock.stockInfo);
            _this.stockInfoOpt = {
                chart: { zoomType: 'x',
                    height: 350
                },
                title: { text: _this.symbol + ' Stock Price and Volume' },
                subtitle: {
                    useHTML: true,
                    text: '<a id="source" href="https://www.alphavantage.co/">' +
                        'Source: Alpha Vantage</a>'
                },
                series: [
                    {
                        yAxis: 0,
                        type: 'area',
                        name: 'Price',
                        data: _this.stock.stockInfo.recentPrice
                    },
                    {
                        yAxis: 1,
                        type: 'column',
                        name: 'Volume',
                        data: _this.stock.stockInfo.recentVolume
                    }
                ],
                plotOptions: {
                    series: {
                        stickyTracking: false
                    },
                    turboThreshold: 0
                },
                xAxis: {
                    categories: _this.stock.stockInfo.recentDay,
                    labels: {
                        step: 5,
                        rotation: -45
                    }
                },
                yAxis: [
                    {
                        title: {
                            text: 'Stock Price'
                        }
                    },
                    {
                        title: {
                            text: 'Volume'
                        },
                        opposite: true
                    }
                ],
                colors: [
                    '#0000FF',
                    '#FF0000'
                ]
            };
            _this.highstockOptions = {
                rangeSelector: {
                    selected: 1
                },
                title: { text: _this.symbol + ' Stock Value' },
                series: [{
                        name: _this.symbol,
                        data: _this.stock.stockInfo.all,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
            };
            if (_this.selection == "DEFAULT" || _this.selection == "STOCK_INFO") {
                _this.chartOptions = _this.stockInfoOpt;
            }
            if (localStorage.getItem(_this.stock.stockInfo.symbol.toUpperCase()) != null) {
                _this.isFavorStock = true;
            }
            else {
                _this.isFavorStock = false;
            }
        }, function (err) {
            console.error(err);
        });
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/SMA?symbol=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.stock.sma = data.json();
            console.log(_this.stock.sma);
            _this.smaOpt = {
                chart: { zoomType: 'x',
                    height: 350
                },
                title: { text: 'Simple Moving Average (SMA)' },
                subtitle: {
                    useHTML: true,
                    text: '<a id="source" href="https://www.alphavantage.co/">' +
                        'Source: Alpha Vantage</a>'
                },
                series: [{
                        name: _this.symbol,
                        data: _this.stock.sma.sma
                    }],
                plotOptions: {
                    series: {
                        stickyTracking: false
                    },
                    turboThreshold: 0
                },
                xAxis: {
                    categories: _this.stock.sma.recentDay,
                    labels: {
                        step: 5,
                        rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: 'SMA'
                    }
                }
            };
            if (_this.selection == "SMA")
                _this.chartOptions = _this.smaOpt;
        }, function (err) {
            console.error(err);
        });
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/EMA?symbol=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.stock.ema = data.json();
            console.log(_this.stock.ema);
            _this.emaOpt = {
                chart: { zoomType: 'x',
                    height: 350
                },
                title: { text: 'Exponential Moving Average (EMA)' },
                subtitle: {
                    useHTML: true,
                    text: '<a id="source" href="https://www.alphavantage.co/">' +
                        'Source: Alpha Vantage</a>'
                },
                series: [{
                        name: _this.symbol,
                        data: _this.stock.ema.ema
                    }],
                plotOptions: {
                    series: {
                        stickyTracking: false
                    },
                    turboThreshold: 0
                },
                xAxis: {
                    categories: _this.stock.ema.recentDay,
                    labels: {
                        step: 5,
                        rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: 'EMA'
                    }
                }
            };
            if (_this.selection == "EMA")
                _this.chartOptions = _this.emaOpt;
        }, function (err) {
            console.error(err);
        });
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/STOCH?symbol=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.stock.stoch = data.json();
            console.log(_this.stock.stoch);
            _this.stochOpt = {
                chart: { zoomType: 'x',
                    height: 350
                },
                title: { text: 'Stochastic (STOCH)' },
                subtitle: {
                    useHTML: true,
                    text: '<a id="source" href="https://www.alphavantage.co/">' +
                        'Source: Alpha Vantage</a>'
                },
                series: [
                    {
                        name: _this.symbol + ' STOCH_SlowK',
                        data: _this.stock.stoch.slowK
                    },
                    {
                        name: _this.symbol + ' STOCH_SlowD',
                        data: _this.stock.stoch.slowD
                    }
                ],
                plotOptions: {
                    series: {
                        stickyTracking: false
                    },
                    turboThreshold: 0
                },
                xAxis: {
                    categories: _this.stock.stoch.recentDay,
                    labels: {
                        step: 5,
                        rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: 'STOCH'
                    }
                }
            };
            if (_this.selection == "STOCH")
                _this.chartOptions = _this.stochOpt;
        }, function (err) {
            console.error(err);
        });
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/RSI?symbol=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.stock.rsi = data.json();
            console.log(_this.stock.rsi);
            _this.rsiOpt = {
                chart: { zoomType: 'x',
                    height: 350
                },
                title: { text: 'Relative Strength Index (RSI)' },
                subtitle: {
                    useHTML: true,
                    text: '<a id="source" href="https://www.alphavantage.co/">' +
                        'Source: Alpha Vantage</a>'
                },
                series: [{
                        name: _this.symbol,
                        data: _this.stock.rsi.rsi
                    }],
                plotOptions: {
                    series: {
                        stickyTracking: false
                    },
                    turboThreshold: 0
                },
                xAxis: {
                    categories: _this.stock.rsi.recentDay,
                    labels: {
                        step: 5,
                        rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: 'RSI'
                    }
                }
            };
            if (_this.selection == "RSI")
                _this.chartOptions = _this.rsiOpt;
        }, function (err) {
            console.error(err);
        });
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/ADX?symbol=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.stock.adx = data.json();
            console.log(_this.stock.adx);
            _this.adxOpt = {
                chart: { zoomType: 'x',
                    height: 350
                },
                title: { text: 'Average Directional movement indeX (ADX)' },
                subtitle: {
                    useHTML: true,
                    text: '<a id="source" href="https://www.alphavantage.co/">' +
                        'Source: Alpha Vantage</a>'
                },
                series: [{
                        name: _this.symbol,
                        data: _this.stock.adx.adx
                    }],
                plotOptions: {
                    series: {
                        stickyTracking: false
                    },
                    turboThreshold: 0
                },
                xAxis: {
                    categories: _this.stock.adx.recentDay,
                    labels: {
                        step: 5,
                        rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: 'ADX'
                    }
                }
            };
            if (_this.selection == "ADX")
                _this.chartOptions = _this.adxOpt;
        }, function (err) {
            console.error(err);
        });
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/CCI?symbol=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.stock.cci = data.json();
            console.log(_this.stock.cci);
            _this.cciOpt = {
                chart: { zoomType: 'x',
                    height: 350
                },
                title: { text: 'Commodity Channel Index (CCI)' },
                subtitle: {
                    useHTML: true,
                    text: '<a id="source" href="https://www.alphavantage.co/">' +
                        'Source: Alpha Vantage</a>'
                },
                series: [{
                        name: _this.symbol,
                        data: _this.stock.cci.cci
                    }],
                plotOptions: {
                    series: {
                        stickyTracking: false
                    },
                    turboThreshold: 0
                },
                xAxis: {
                    categories: _this.stock.cci.recentDay,
                    labels: {
                        step: 5,
                        rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: 'CCI'
                    }
                }
            };
            if (_this.selection == "CCI")
                _this.chartOptions = _this.cciOpt;
        }, function (err) {
            console.error(err);
        });
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/BBANDS?symbol=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.stock.bbands = data.json();
            console.log(_this.stock.bbands);
            _this.bbandsOpt = {
                chart: { zoomType: 'x',
                    height: 350
                },
                title: { text: 'Bollinger Bands (BBANDS)' },
                subtitle: {
                    useHTML: true,
                    text: '<a id="source" href="https://www.alphavantage.co/">' +
                        'Source: Alpha Vantage</a>'
                },
                series: [
                    {
                        name: _this.symbol + ' Real Middle Brand',
                        data: _this.stock.bbands.middleBand
                    },
                    {
                        name: _this.symbol + ' Real Upper Brand',
                        data: _this.stock.bbands.upperBand
                    },
                    {
                        name: _this.symbol + ' Real Lower Brand',
                        data: _this.stock.bbands.lowerBand
                    }
                ],
                plotOptions: {
                    series: {
                        stickyTracking: false
                    },
                    turboThreshold: 0
                },
                xAxis: {
                    categories: _this.stock.bbands.recentDay,
                    labels: {
                        step: 5,
                        rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: 'BBANDS'
                    }
                }
            };
            if (_this.selection == "BBANDS")
                _this.chartOptions = _this.bbandsOpt;
        }, function (err) {
            console.error(err);
        });
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/MACD?symbol=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.stock.macd = data.json();
            console.log(_this.stock.macd);
            _this.macdOpt = {
                chart: { zoomType: 'x',
                    height: 350
                },
                title: { text: 'Moving Average Convergence/Divergence (MACD)' },
                subtitle: {
                    useHTML: true,
                    text: '<a id="source" href="https://www.alphavantage.co/">' +
                        'Source: Alpha Vantage</a>'
                },
                series: [
                    {
                        name: _this.symbol + ' MACD',
                        data: _this.stock.macd.macd
                    },
                    {
                        name: _this.symbol + ' MACD_Hist',
                        data: _this.stock.macd.macdHist
                    },
                    {
                        name: _this.symbol + ' MACD_Signal',
                        data: _this.stock.macd.macdSignal
                    }
                ],
                plotOptions: {
                    series: {
                        stickyTracking: false
                    },
                    turboThreshold: 0
                },
                xAxis: {
                    categories: _this.stock.macd.recentDay,
                    labels: {
                        step: 5,
                        rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: 'MACD'
                    }
                }
            };
            if (_this.selection == "MACD")
                _this.chartOptions = _this.macdOpt;
        }, function (err) {
            console.error(err);
        });
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/NEWS?symbol=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.stock.news = data.json();
            console.log(_this.stock.news);
        }, function (err) {
            console.error(err);
        });
    };
    AppComponent.prototype.fetchAutocomplete = function () {
        var _this = this;
        this.http.get('http://stock.us-west-2.elasticbeanstalk.com/AUTOCOMPLETE?letters=' + this.symbol)
            .subscribe(function (data) {
            console.log(data);
            _this.autocomplete = data.json();
            console.log(_this.autocomplete);
            if (_this.symbol == _this.autocomplete.letter)
                _this.options = _this.autocomplete.items;
        }, function (err) {
            console.error(err);
        });
    };
    AppComponent.prototype.setSymbol = function (option) {
        this.symbol = option.split(" ")[0];
    };
    AppComponent.prototype.convertCurrentFavor = function () {
        if (this.isFavorStock) {
            localStorage.removeItem(this.stock.stockInfo.symbol.toUpperCase());
        }
        else {
            localStorage.setItem(this.stock.stockInfo.symbol.toUpperCase(), JSON.stringify(this.stock.stockInfo));
        }
        this.isFavorStock = !this.isFavorStock;
        this.favorStock = new Array();
        for (var i = 0, j = localStorage.length - 1; i < localStorage.length, j >= 0; i++, j--) {
            var json = localStorage.getItem(localStorage.key(i));
            this.favorStock[j] = JSON.parse(json);
        }
    };
    AppComponent.prototype.chooseFavor = function (favor) {
        this.symbol = favor.symbol;
        this.onQuery();
    };
    AppComponent.prototype.deleteFavor = function (favor) {
        if (this.stock.stockInfo.symbol.toUpperCase() == favor.symbol) {
            this.isFavorStock = false;
        }
        localStorage.removeItem(favor.symbol.toUpperCase());
        this.favorStock = new Array();
        for (var i = 0, j = localStorage.length - 1; i < localStorage.length, j >= 0; i++, j--) {
            var json = localStorage.getItem(localStorage.key(i));
            this.favorStock[j] = JSON.parse(json);
        }
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: "\n    <div class=\"container\">\n      <div class=\"well\" style=\"margin-top: 30px\">\n        <div class=\"col-lg-6 col-center-block\" align=\"center\">\n          <h3> <b> Stock Market Search </b> </h3>\n        </div>\n        <div class=\"row\">\n          <form class=\"col-lg-12 form-horizontal col-center-block\">\n            <div class=\"col-lg-3\">\n              <label for=\"symbol\" class=\"control-label\">\n                <b> Enter Stock Ticker Symbol:* </b>\n              </label>\n            </div>\n            <div class=\"col-lg-6\">\n\t\t\t\t\t\t\t<mat-form-field style=\"width:100%;\">\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" [(ngModel)]=\"symbol\" matInput [formControl]=\"myControl\" [matAutocomplete]=\"auto\" (ngModelChange)=\"fetchAutocomplete()\" style=\"background-color:white\" required autofocus/>\n\t\t\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t\t\t\t<mat-autocomplete #auto=\"matAutocomplete\">\n\t\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let option of options\" [value]=\"option\" (click)=\"setSymbol(option)\">\n\t\t\t\t\t\t\t\t\t\t{{ option }}\n\t\t\t\t\t\t\t\t\t</mat-option>\n\t\t\t\t\t\t\t\t</mat-autocomplete>\n              <div>\n\t\t\t\t\t\t\t\tPlease enter a stock ticker symbol.\n\t\t\t\t\t\t\t</div>\n            </div>\n            <div class=\"col-lg-3\">\n              <button type=\"submit\" class=\"btn btn-primary \" (click)=\"onQuery()\">\n                <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span> Get Quote\n              </button>\n              <button type=\"reset\" class=\"btn btn-default\">\n                <span class=\"glyphicon glyphicon-refresh\" aria-hidden=\"true\"></span> Clear\n              </button>\n            </div>\n          </form>\n        </div>\n      </div>\n      <hr />\n      <div class=\"tab-content\">\n        <div class=\"tab-pane fade in active\" id=\"favorite_stocks\">\n          <div class=\"well\">\n            <div class=\"panel panel-default\">\n              <div class=\"panel-heading\" style=\"height: 55px;\">\n                <b style=\"line-height: 35px;\">Favorite List</b>\n                <div class=\"pull-right\">\n                  <a href=\"#stock_details\" data-toggle=\"tab\">\n                  <button class=\"btn btn-default pull-right\" style=\"margin-left: 8px;\">\n                    <span class=\"glyphicon glyphicon-menu-right\" aria-hidden=\"true\"></span>\n                  </button>\n                  </a>\n                  <button class=\"btn btn-default pull-right\" style=\"margin-left: 8px;\">\n                    <span class=\"glyphicon glyphicon-refresh\" aria-hidden=\"true\"></span>\n                  </button>\n\t\t\t\t\t\t\t\t\t<font>Automatic Refresh: </font>\n                  <input data-toggle=\"toggle\" type=\"checkbox\"/>\n\t\t\t\t\t\t\t\t\t\n                </div>\n              </div>\n              <div class=\"panel-body\">\n                 \n                  <div class=\"col-lg-1\">\n                   <label style=\"line-height: 35px;\">Sort by</label>\n\t\t\t\t\t\t\t\t\t</div>\n                 \t<div class=\"col-lg-3\">\n                  <select class=\"selectpicker show-tick\" data-dropup-auto=\"false\" data-size=\"6\">\n                    <option> Default </option>\n                    <option> Symbol </option>\n                    <option> Price </option>\n                    <option> Change </option>\n                    <option> Change Percent </option>\n                    <option> Volume </option>\n                  </select>      \n                  </div>\n                  <div class=\"col-lg-1\">\n\t\t\t\t\t\t\t\t\t\t<label style=\"line-height: 35px;\">Order</label>\n\t\t\t\t\t\t\t\t\t</div>\n                 <div class=\"col-lg-3\">\n                  <select class=\"selectpicker show-tick\" data-dropup-auto=\"false\" [disabled]=\"!upOrDown\">\n                    <option> Ascending </option>\n                    <option> Descending </option>\n                  </select>\n                </div>\n                \n                <table class=\"table table-hover table-striped\">\n                  <tr>\n                    <td><b> Symbol </b></td>\n                    <td><b> Stock Price </b></td>\n                    <td><b> Change (Change Percent) </b></td>\n                    <td><b> Volume </b></td>\n\t\t\t\t\t\t\t\t\t\t<td></td>\n                  </tr>\n\t\t\t\t\t\t\t\t\t<tr *ngFor=\"let favor of favorStock\">\n\t\t\t\t\t\t\t\t\t\t<td> <a (click)=\"chooseFavor(favor)\">{{favor.symbol}} </a></td>\n\t\t\t\t\t\t\t\t\t\t<td> {{favor.lastPrice}} </td>\n\t\t\t\t\t\t\t\t\t\t<td> {{favor.change}} </td>\n\t\t\t\t\t\t\t\t\t\t<td> {{favor.volume}} </td>\n\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-default\" (click)=\"deleteFavor(favor)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t</tr>\n                </table>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"tab-pane fade\" id=\"stock_details\">\n          <div class=\"well\">\n            <div class=\"panel panel-default\">\n              <div class=\"panel-heading\" align=\"center\">\n                <b style=\"line-height: 30px;\"> Stock Details </b> \n\t\t\t\t\t\t\t\t<a href=\"#favorite_stocks\" data-toggle=\"tab\">\n\t\t\t\t\t\t\t\t\t<button class=\"btn btn-default pull-left\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"glyphicon glyphicon-menu-left\" aria-hidden=\"true\"></span>\n\t\t\t\t\t\t\t\t\t</button>\n                </a>\n              </div>\n              <div class=\"panel-body\">\n                <ul class=\"nav nav-pills\">\n                  <li class=\"active\" role=\"presentation\">\n                    <a href=\"#current_stock\" data-toggle=\"tab\"> \n\t\t\t\t\t\t\t\t\t\t<span class=\"glyphicon glyphicon-dashboard\" aria-hidden=\"true\"></span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"hidden-xs\">&nbsp;Current Stock </span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"visible-xs\" style=\"float:right;\">&nbsp;Stock </span>\n\t\t\t\t\t\t\t\t\t\t</a>\n                  </li>\n                  <li role=\"presentation\">\n                    <a href=\"#historical_charts\" data-toggle=\"tab\"> <span class=\"glyphicon glyphicon-stats\" aria-hidden=\"true\"></span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"hidden-xs\">&nbsp;Historical Charts </span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"visible-xs\" style=\"float:right;\">&nbsp;Charts </span>\n\t\t\t\t\t\t\t\t\t\t</a>\n                  </li>\n                  <li role=\"presentation\">\n                    <a href=\"#new_feeds\" data-toggle=\"tab\"> <span class=\"glyphicon glyphicon-link\" aria-hidden=\"true\"></span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"hidden-xs\">&nbsp;New Feeds</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"visible-xs\" style=\"float:right;\">&nbsp;News </span>\n\t\t\t\t\t\t\t\t\t\t</a>\n                  </li>\n                </ul>\n                <hr />\n                <div class=\"tab-content\">\n                  <div class=\"tab-pane fade in active\" id=\"current_stock\">\n                    <div class=\"col-lg-6\">\n                      <div>\n                        <b style=\"line-height: 35px;margin-left: 15px;\"> Stock Details </b>\n                        <button class=\"btn btn-default pull-right\" style=\"margin-bottom: 25px;margin-right: 15px;margin-left: 8px;\" [disabled]=\"!stock.stockInfo\">\n                          <img src=\"assets/img/facebook.png\" style=\"width: 20px;height:20px;\"/>\n                        </button>\n                        <button (click)=\"convertCurrentFavor()\" class=\"btn btn-default pull-right\" [disabled]=\"!stock.stockInfo\">\n                          <span *ngIf=\"!isFavorStock\" class=\"glyphicon glyphicon-star-empty\" aria-hidden=\"true\" style=\"font-size: 17px;\"></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"isFavorStock\" class=\"glyphicon glyphicon-star\" aria-hidden=\"true\" style=\"font-size: 17px;color:yellow;\"></span>\n                        </button>\n                      </div>\n                      <table class=\"table table-hover table-striped\" *ngIf=\"stock.stockInfo\" height=\"350px\">\n                        <tr>\n                          <td><b> Stock Ticker Symbol </b></td>\n                          <td> <span *ngIf=\"stock\">{{stock.stockInfo?.symbol}}</span> </td>\n                        </tr>\n                        <tr>\n                          <td><b> Last Price </b></td>\n                          <td> <span *ngIf=\"stock\">{{stock.stockInfo?.lastPrice}}</span> </td>\n                        </tr>\n                        <tr>\n                          <td><b> Change (Change Percent) </b></td>\n                          <td> <span *ngIf=\"stock\">{{stock.stockInfo?.change}}</span> </td>\n                        </tr>\n                        <tr>\n                          <td><b> Timestamp </b></td>\n                          <td> <span *ngIf=\"stock\">{{stock.stockInfo?.timeStamp}}</span> </td>\n                        </tr>\n                        <tr>\n                          <td><b> Open </b></td>\n                          <td> <span *ngIf=\"stock\">{{stock.stockInfo?.open}}</span> </td>\n                        </tr>\n                        <tr>\n                          <td><b> Previous Close </b></td>\n                          <td> <span *ngIf=\"stock\">{{stock.stockInfo?.prevClose}}</span> </td>\n                        </tr>\n                        <tr>\n                          <td><b> Day's Range </b></td>\n                          <td> <span *ngIf=\"stock\">{{stock.stockInfo?.range}}</span> </td>\n                        </tr>\n                        <tr>\n                          <td><b> Volume </b></td>\n                          <td> <span *ngIf=\"stock\">{{stock.stockInfo?.volume}}</span> </td>\n                        </tr>\n                      </table>\n\t\t\t\t\t\t\t\t\t\t\t<div *ngIf=\"!stock.stockInfo\" class=\"progress\" style=\"margin-top:100px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 50%;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"sr-only\">45% Complete</span>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n                    </div>\n                    <div class=\"col-lg-6\">\n                      <ul class=\"nav nav-tabs\">\n                        <li role=\"presentation\" [ngClass]=\"{'active':true}\" (click)=\"drawStockInfo()\">\n                          <a href=\"#chartTab\" data-toggle=\"tab\"> Price </a>\n                        </li>\n                        <li role=\"presentation\" (click)=\"drawSMA()\">\n                          <a href=\"#chartTab\" data-toggle=\"tab\"> SMA </a>\n                        </li>\n                        <li role=\"presentation\" (click)=\"drawEMA()\">\n                          <a href=\"#chartTab\" data-toggle=\"tab\"> EMA </a>\n                        </li>\n                        <li role=\"presentation\" (click)=\"drawSTOCH()\">\n                          <a href=\"#chartTab\" data-toggle=\"tab\"> STOCH </a>\n                        </li>\n                        <li role=\"presentation\" (click)=\"drawRSI()\">\n                          <a href=\"#chartTab\" data-toggle=\"tab\"> RSI </a>\n                        </li>\n                        <li role=\"presentation\" (click)=\"drawADX()\">\n                          <a href=\"#chartTab\" data-toggle=\"tab\"> ADX </a>\n                        </li>\n                        <li role=\"presentation\" (click)=\"drawCCI()\">\n                          <a href=\"#chartTab\" data-toggle=\"tab\"> CCI </a>\n                        </li>\n                        <li role=\"presentation\" (click)=\"drawBBANDS()\">\n                          <a href=\"#chartTab\" data-toggle=\"tab\"> BBANDS </a>\n                        </li>\n                        <li role=\"presentation\" (click)=\"drawMACD()\">\n                          <a href=\"#chartTab\" data-toggle=\"tab\"> MACD </a>\n                        </li>\n                      </ul>\n                      <div *ngIf=\"chartOptions\" class=\"tab-content\">\n                        <div class=\"tab-pane fade in active\" id=\"chartTab\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<chart [options] = \"chartOptions\" (load)=\"saveInstance($event.context)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t</chart>\n                        </div>\n                      </div>\n\t\t\t\t\t\t\t\t\t\t\t<div *ngIf=\"!chartOptions\" class=\"progress\" style=\"margin-top:50px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 50%;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"sr-only\">45% Complete</span>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-12 tab-pane fade\" id=\"historical_charts\">\n                  \t<chart type=\"StockChart\" *ngIf=\"highstockOptions\" [options]=\"highstockOptions\">\n\t\t\t\t\t\t\t\t\t\t</chart>\n\t\t\t\t\t\t\t\t\t\t\t<div *ngIf=\"!highstockOptions\" class=\"progress\" style=\"margin-top:50px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 50%;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"sr-only\">45% Complete</span>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\n                  </div>\n                  <div class=\"col-lg-12 tab-pane fade\" id=\"new_feeds\">\n\t\t\t\t\t\t\t\t\t\t\t<div *ngIf=\"!stock.news\" class=\"progress\" style=\"margin-top:50px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 50%;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"sr-only\">45% Complete</span>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<ul *ngIf=\"stock.news\">\n\t\t\t\t\t\t\t\t\t\t<li *ngFor=\"let link of stock.news.link; let i = index;\" style=\"list-style-type:none;\">\n                    <div class=\"well\">\n                      <div>\n                        <a href={{link}}>{{link}}</a>\n                      </div>\n                      <div>\n                        <b> Author: {{stock.news.author[i]}}</b>\n                      </div>\n                      <div>\n                        <b> Date: {{stock.news.date[i]}}</b>\n                      </div>\n                    </div>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t</ul>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\t\t\n  ",
            styles: ["\n\t\t\t.col-center-block {\n\t\t\t\tfloat: none;\n\t\t\t\tdisplay: block;\n\t\t\t\tmargin-left: auto;\n\t\t\t\tmargin-right: auto;\n\t\t\t}\n\t\t\t.btn-default:focus {\n\t\t\t\tbackground-color: #fff;\n\t\t\t}\n      chart {\n        display: block;\n      }\n\t\t\ta:hover{ cursor:pointer;}\n"]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AppComponent);
    return AppComponent;
}());

var Stock = (function () {
    function Stock() {
    }
    return Stock;
}());

var StockInfo = (function () {
    function StockInfo() {
    }
    return StockInfo;
}());

var SMA = (function () {
    function SMA() {
    }
    return SMA;
}());

var EMA = (function () {
    function EMA() {
    }
    return EMA;
}());

var STOCH = (function () {
    function STOCH() {
    }
    return STOCH;
}());

var RSI = (function () {
    function RSI() {
    }
    return RSI;
}());

var ADX = (function () {
    function ADX() {
    }
    return ADX;
}());

var CCI = (function () {
    function CCI() {
    }
    return CCI;
}());

var BBANDS = (function () {
    function BBANDS() {
    }
    return BBANDS;
}());

var MACD = (function () {
    function MACD() {
    }
    return MACD;
}());

var News = (function () {
    function News() {
    }
    return News;
}());

var Autocomplete = (function () {
    function Autocomplete() {
    }
    return Autocomplete;
}());

var FavorStock = (function () {
    function FavorStock() {
    }
    return FavorStock;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_highcharts__ = __webpack_require__("../../../../angular2-highcharts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_4_angular2_highcharts__["ChartModule"].forRoot(__webpack_require__("../../../../highcharts/highcharts.js")),
                __WEBPACK_IMPORTED_MODULE_4_angular2_highcharts__["ChartModule"].forRoot(__webpack_require__("../../../../highcharts/modules/exporting.js")),
                __WEBPACK_IMPORTED_MODULE_4_angular2_highcharts__["ChartModule"].forRoot(__webpack_require__("../../../../highcharts/highstock.js")),
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map