"use strict"
const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const xmlreader = require("xmlreader");  
const moment = require('moment-timezone');
moment().tz("America/New_York").format();
const day = 121;
var apiKey = [
	'P8AMKHB1MYAQKKCX',
	'8Z742PRMCPFKU6T9',
	'G3X4LT5ANEDPQ967',
	'I7GWB058GIM8LMC5',
	'RMJPAFJ108P57ZJZ',
	'030KP21ORNKRQZI9',
	'TVQMSR1U3DA1QLM4',
	'HSR31T2U2E3CVL8B',
	'HMQ6MJUDHQTMHBTS',
	'OJN6BZRT7NDRM6BI',
	'0IRPYF2L7EB49XLW',
	'W87YTCWLNCRXN8O4',
	'H95LYYNG4USXCNTC',
	'VR2AE6UJPWCBLYBJ',
	'4H1R80M3LZT7BCTL',
	'9YJW5VJ4U3HK40C6',
	'86U4UD8JRKXMQBVI',
	'F19HEKDVVJH0F551',
	'TK4ZL72LS3M6O6V4',
	'8GRJ15E7P1AG5CKG',
	'RDOL291VZ4RAYCN0',
	'5JQIFEI2Z45FDTW0',
	'8DBFFAGS496QZXME',
	'NHEEU3MRV0WF1BMD',
	'HPJIT2WB1WJKF800',
	'NYIT8FCAA0D8BAA0',
	'YI1O2C4KOJ0UN4N7',
	'9A1H37K5PH9DLBYE',
	'JC2U1PV6BVSPTOVM',
	'URUOXWZ7W5Q5D9KN',
	'UWSEIOAVSAW2054H',
	'8JOIZAMLER56CXZQ',
	'MPUN22G689PFHCFH',
	'HF5LJ6FP4XHOJYSY',
	'2E91GY4ZV334Y4BY',
	'FI60JD8RWMN3IJJC',
	'FNE48YW8ALKNAYPQ',
	'EI8BSKYN5468C944',
	'5DEJJOQZW3B94ODH',
	'AAD2IK52XTCZRHTH',
	'MPUN22G689PFHCFH',
	'AT38E7W8QJ3SG12U',
	'2WI3IHPAY7590DSU',
	'9DUOKWQ1NFQI25ZJ',
	'RDOL291VZ4RAYCN0',
	'R6WBNVR8V7J33SJ2',
	'9J62IQ4AJ1LE88WM',
	'363ZXV8C8I48MUEM',
	'LQ928302OT6T3O3Z',
	'IKS372Q5RHLB40VY',
	'L34N21HE5P5TRYN9',
	'57WNQNY41JVUKPRO',
	'HMQ6MJUDHQTMHBTS'
];

var server = app.listen(8081, function() 
{
	var host = server.address().address;
	var port = server.address().port;
	console.log("Server is running at " +host + ":"+ port);
});

function StockInfo(symbol, price, volume, date){
	this.symbol = symbol;
	this.price = price;
	this.volume = volume;
	this.date = date;
}

function CurrentStockInfo(symbol, price, volume, date, change, changePercent, openPrice, prevClose, high, low){
	this.stockInfo = new StockInfo(symbol, price, volume, date);
	this.change = change;
	this.changePercent = changePercent;
	this.openPrice = openPrice;
	this.prevClose = prevClose;
	this.high = high;
	this.low = low;
	this.range = low + " - " + high;
}

function SMA(sma, date){
	this.sma = sma;
	this.date = date;
}

function EMA(ema, date){
	this.ema = ema;
	this.date = date;
}

function STOCH(slowK, slowD, date){
	this.slowK = slowK;
	this.slowD = slowD;
	this.date = date;
}

function RSI(rsi, date){
	this.rsi = rsi;
	this.date = date;
}

function ADX(adx, date){
	this.adx = adx;
	this.date = date;
}

function CCI(cci, date){
	this.cci = cci;
	this.date = date;
}

function BBANDS(lowerBand, middleBand, upperBand, date){
	this.lowerBand = lowerBand;
	this.middleBand = middleBand;
	this.upperBand = upperBand;
	this.date = date;
}

function MACD(macdSignal, macdHist, macd, date){
	this.macdSignal = macdSignal;
	this.macdHist = macdHist;
	this.macd = macd;
	this.date = date;
}

function News(title, link, author, date){
	this.title = title;
	this.link = link;
	this.author = author;
	this.date = date;
}

function Autocomplete(letters, autoItems){
	this.letters = letters;
	if(autoItems !== null){
		this.autoItems = autoItems;
	}
	this.autoItems = [];
}

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

process.on('uncaughtException', function (err) 
{
  console.log('Caught exception: ' + err);
}); 

function randomKey(){
	var i = Math.round(Math.random() * 50);
	return apiKey[i];
}

app.get('/', function(req, res) 
{
	fetchCurrentStockInfo(req.query.symbol, res);
});

app.get('/RECENT', function(req, res) 
{
	fetchRecentStockInfo(req.query.symbol, res);
});

app.get('/ALL', function(req, res) 
{
	fetchAllStockInfo(req.query.symbol, res);
});

app.get('/SMA', function(req, res) 
{
	fetchSMA(req.query.symbol, res);
});

app.get('/EMA', function(req, res) 
{
	fetchEMA(req.query.symbol, res);
});

app.get('/STOCH', function(req, res) 
{
	fetchSTOCH(req.query.symbol, res);
});

app.get('/RSI', function(req, res) 
{
	fetchRSI(req.query.symbol, res);
});

app.get('/ADX', function(req, res) 
{
	fetchADX(req.query.symbol, res);
});

app.get('/CCI', function(req, res) 
{
	fetchCCI(req.query.symbol, res);
});

app.get('/BBANDS', function(req, res) 
{
	fetchBBANDS(req.query.symbol, res);
});

app.get('/MACD', function(req, res) 
{
	fetchMACD(req.query.symbol, res);
});

app.get('/NEWS', function(req, res) 
{
	fetchNews(req.query.symbol, res);
});

app.get('/AUTOCOMPLETE', function(req, res) 
{
	fetchAutocomplete(req.query.letters, res);
});



function fetchCurrentStockInfo(symbol, res){
	console.log("Symbol Request Received!");
	var key = randomKey();
	console.log(key);
	https.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + 
						"&outputsize=full&apikey=" + key, function(data){
		var json = '';
		data.on('data', function(d){
			json += d;
		});
		data.on('end', function(){
			try{
				json = JSON.parse(json);
				var currentStockInfo = new CurrentStockInfo();
				var metaData = json['Meta Data'];
				var dailyInfo = json['Time Series (Daily)'];
				currentStockInfo.stockInfo.symbol = metaData['2. Symbol'];
				currentStockInfo.stockInfo.date = metaData['3. Last Refreshed'];
				if(currentStockInfo.stockInfo.date.length <= 11){
					currentStockInfo.stockInfo.date += " 16:00:00";
				}
				var timer = 0;
				for(var info in dailyInfo){
					if(dailyInfo.hasOwnProperty(info)){
						if(timer === 0){
							currentStockInfo.stockInfo.price = Number(dailyInfo[info]['4. close']);
							currentStockInfo.openPrice = Number(dailyInfo[info]['1. open']);
							currentStockInfo.stockInfo.volume = Number(dailyInfo[info]['5. volume']);
							currentStockInfo.low = Number(dailyInfo[info]['3. low']);
							currentStockInfo.high = Number(dailyInfo[info]['2. high']);
							currentStockInfo.range = Number(dailyInfo[info]['3. low']) + " - " + Number(dailyInfo[info]['2. high']);
						}
						else if(timer === 1){
							currentStockInfo.prevClose = Number(dailyInfo[info]['4. close']);
							currentStockInfo.change = Number((currentStockInfo.stockInfo.price - Number(dailyInfo[info]['4. close'])).toFixed(2));
							currentStockInfo.changePercent = Number(((currentStockInfo.stockInfo.price - Number(dailyInfo[info]['4. close'])) * 100 / currentStockInfo.stockInfo.price).toFixed(2));
						}
						else{
							break;
						}
						timer++;
					}
				}
				console.log(currentStockInfo);
				res.send(currentStockInfo);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
		});
    }).on('error', function(e){
    	console.log(e.message);   
  	});
}

function fetchRecentStockInfo(symbol, res)
{
	https.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + 
						"&outputsize=full&apikey=8Z742PRMCPFKU6T9", function(data){
		var json = '';
		var recentStockInfo = [];
    data.on('data', function(d){
      json += d;
    });
    data.on('end', function(){
			try{
				json = JSON.parse(json);
				var metaData = json['Meta Data'];
				var dailyInfo = json['Time Series (Daily)'];
				var timer = 0;
				for(var info in dailyInfo){
					if(timer < day){
						recentStockInfo.unshift(new StockInfo(metaData['2. Symbol'],
																									Number(Number(dailyInfo[info]['4. close']).toFixed(2)),
																									Number(Number(dailyInfo[info]['5. volume'])),
																									moment.tz(info, "America/New_York").format("MM/DD")));
					}
					timer++;
				}
				console.log(recentStockInfo);
				res.send(recentStockInfo);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
		});
	}).on('error', function(e){
		console.log(e.message);   
  });
}

function fetchAllStockInfo(symbol, res)
{
	https.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + 
						"&outputsize=full&apikey=P8AMKHB1MYAQKKCX", function(data){
		var json = '';
		var allStockInfo = [];
    data.on('data', function(d){
      json += d;
    });
    data.on('end', function(){
			try{
				json = JSON.parse(json);
				var metaData = json['Meta Data'];
				var dailyInfo = json['Time Series (Daily)'];
				var timer = 0;
				for(var info in dailyInfo){
					allStockInfo.unshift(new StockInfo(metaData['2. Symbol'],
																						 Number(Number(dailyInfo[info]['4. close']).toFixed(2)),
																						 Number(Number(dailyInfo[info]['5. volume'])),
																						 info));
					timer++;
				}
				console.log(allStockInfo);
				res.send(allStockInfo);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
		});
	}).on('error', function(e){
		console.log(e.message);   
  });
}

function fetchSMA(symbol, res)
{
	https.get("https://www.alphavantage.co/query?function=SMA&symbol=" + symbol +
						"&interval=daily&time_period=10&series_type=close&apikey=G3X4LT5ANEDPQ967", function(data){
		var json = '';
		var sma = [];
    data.on('data', function(d){
			json += d;
    });
		data.on('end', function(){
			try{
				json = JSON.parse(json);
				var i = 0;
				for(var date in json['Technical Analysis: SMA']){
					if(i >= day){
						break;
					}
					for(var s in json['Technical Analysis: SMA'][date]){
						sma.unshift(new SMA(parseFloat(json['Technical Analysis: SMA'][date][s]), 
																moment.tz(date, "America/New_York").format("MM/DD")));
					}
					i++;
				}
				console.log(sma);
				res.send(sma);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
    	});
	}).on('error', function(e){
		console.log(e.message); 
	});
}

function fetchEMA(symbol, res)
{
	https.get("https://www.alphavantage.co/query?function=EMA&symbol=" + symbol +
						"&interval=daily&time_period=10&series_type=close&apikey=I7GWB058GIM8LMC5", function(data){
		var json = '';
		var ema = [];
    data.on('data', function(d){
			json += d;
		});
    data.on('end', function(){
			try{
				json = JSON.parse(json);
				var i = 0;
				for(var date in json['Technical Analysis: EMA']){
					if(i >= day){
						break;
					}
					for(var s in json['Technical Analysis: EMA'][date]){
						ema.unshift(new EMA(parseFloat(json['Technical Analysis: EMA'][date][s]), 
																moment.tz(date, "America/New_York").format("MM/DD")));
					}
					i++;
				}
				console.log(ema);
				res.send(ema);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
    	});
	}).on('error', function(e){
    console.log(e.message);   
	});
}

function fetchSTOCH(symbol, res)
{
	https.get("https://www.alphavantage.co/query?function=STOCH&symbol=" + symbol + 
						"&interval=daily&apikey=RMJPAFJ108P57ZJZ", function(data){
		var json = '';
		var stoch = [];
    data.on('data', function(d){
      json += d;
    });
    data.on('end', function()
		{
			try{
				json = JSON.parse(json);
				var i = 0;
				for(var date in json['Technical Analysis: STOCH']){
					if(i >= day){
						break;
					}
					stoch.unshift(new STOCH(parseFloat(json['Technical Analysis: STOCH'][date].SlowD),
																	parseFloat(json['Technical Analysis: STOCH'][date].SlowK),
																	moment.tz(date, "America/New_York").format("MM/DD")));
					i++;
				}
				console.log(stoch);
				res.send(stoch);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
    	});
  }).on('error', function(e){
    console.log(e.message);   
  });
}

function fetchRSI(symbol, res)
{
	https.get("https://www.alphavantage.co/query?function=RSI&symbol=" + symbol +
						"&interval=daily&time_period=10&series_type=close&apikey=030KP21ORNKRQZI9", function(data){
  	var json = '';
		var rsi = [];
    data.on('data', function(d){
      json += d;
    });
    data.on('end', function(){
			try{
				json = JSON.parse(json);
				var i = 0;
				for(var date in json['Technical Analysis: RSI']){
					if(i >= day){
						break;
					}
					for(var s in json['Technical Analysis: RSI'][date]){
						rsi.unshift(new RSI(parseFloat(json['Technical Analysis: RSI'][date][s]),
																moment.tz(date, "America/New_York").format("MM/DD")));
					}
					i++;
				}
				console.log(rsi);
				res.send(rsi);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
		});
	}).on('error', function(e){
    console.log(e.message);   
 	});
}

function fetchADX(symbol, res)
{
	https.get("https://www.alphavantage.co/query?function=ADX&symbol=" + symbol + 
						"&interval=daily&time_period=10&apikey=TVQMSR1U3DA1QLM4", function(data){
		var json = '';
		var adx = [];
    data.on('data', function(d){
      json += d;
    });
    data.on('end', function(){
			try{
				json = JSON.parse(json);
				var i = 0;
				for(var date in json['Technical Analysis: ADX']){
					if(i >= day){
						break;
					}
					for(var s in json['Technical Analysis: ADX'][date]){
						adx.unshift(new ADX(parseFloat(json['Technical Analysis: ADX'][date][s]),
																moment.tz(date, "America/New_York").format("MM/DD")));
					}
					i++;
				}
				console.log(adx);
				res.send(adx);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
		});
	}).on('error', function(e){
    console.log(e.message);   
  });
}

function fetchCCI(symbol, res)
{
	https.get("https://www.alphavantage.co/query?function=CCI&symbol=" + symbol + 
						"&interval=daily&time_period=10&apikey=HSR31T2U2E3CVL8B", function(data){
		var json = '';
		var cci = [];
    data.on('data', function(d){
			json += d;
    });
    data.on('end', function(){
			try{
				json = JSON.parse(json);
				var i = 0;
				for(var date in json['Technical Analysis: CCI']){
					if(i >= day){
						break;
					}
					for(var s in json['Technical Analysis: CCI'][date]){
						cci.unshift(new CCI(parseFloat(json['Technical Analysis: CCI'][date][s]),
																moment.tz(date, "America/New_York").format("MM/DD")));
					}
					i++;
				}
				console.log(cci);
				res.send(cci);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
		});
  }).on('error', function(e){
    console.log(e.message);   
  });
}

function fetchBBANDS(symbol, res)
{
	https.get("https://www.alphavantage.co/query?function=BBANDS&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&nbdevup=3&nbdevdn=3&matype=3&apikey=HMQ6MJUDHQTMHBTS", function(data){
		var json = '';
		var bbands = [];
    data.on('data', function(d){
      json += d;
    });
    data.on('end', function(){
			try{
				json = JSON.parse(json);
				var i = 0;
				for(var date in json['Technical Analysis: BBANDS']){
					if(i >= day){
						break;
					}
					bbands.unshift(new BBANDS(parseFloat(json['Technical Analysis: BBANDS'][date]["Real Lower Band"]),
																		parseFloat(json['Technical Analysis: BBANDS'][date]["Real Middle Band"]),
																		parseFloat(json['Technical Analysis: BBANDS'][date]["Real Upper Band"]),
																		moment.tz(date, "America/New_York").format("MM/DD")))
					i++;
				}
				console.log(bbands);
				res.send(bbands);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
    });
  }).on('error', function(e) {
    console.log(e.message);   
  });
}

function fetchMACD(symbol, res)
{
	https.get("https://www.alphavantage.co/query?function=MACD&symbol=" + symbol + 
						"&interval=daily&series_type=close&apikey=OJN6BZRT7NDRM6BI", function(data){
		var json = '';
		var macd = [];
    data.on('data', function(d){
      json += d;
    });
    data.on('end', function(){
			try{
				json = JSON.parse(json);
				var i = 0;
				for(var date in json['Technical Analysis: MACD']){
					if(i >= day){
						break;
					}
					macd.unshift(new MACD(parseFloat(json['Technical Analysis: MACD'][date].MACD_Signal),
															 parseFloat(json['Technical Analysis: MACD'][date].MACD_Hist),
															 parseFloat(json['Technical Analysis: MACD'][date].MACD),
															 moment.tz(date, "America/New_York").format("MM/DD")));
					i++;
				}
				console.log(macd);
				res.send(macd);
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
    });
  }).on('error', function(e) {
    console.log(e.message);
  });
}

function fetchNews(symbol, res)
{
	https.get("https://seekingalpha.com/api/sa/combined/" + symbol.toUpperCase() + ".xml", function(data) {
		var xml = '';
    data.on('data', function(d){
      xml += d;
    });
    data.on('end', function(){
			try{
				xmlreader.read(xml, function(errors, text){  
					if(null !== errors ){  
						console.log(errors);  
						return;  
					}  
					var news = [];
						for(var i = 0; i < text.rss.channel.item.count(); i++){
							var str = text.rss.channel.item.at(i).guid.text();
							if(str.match(/Article/)){
								news.push(new News(text.rss.channel.item.at(i).title.text(),
																	 text.rss.channel.item.at(i).link.text(),
																	 text.rss.channel.item.at(i)['sa:author_name'].text(),
																	 text.rss.channel.item.at(i).pubDate.text().substring(0, text.rss.channel.item.at(i).pubDate.text().length - 6) + " EDT"));
							}
						}
					res.send(news);
				});  
			}
			catch(e){
				res.send("ERROR");
				console.log(e);
			}
		});
	}).on('error', function(e){
		console.log(e.message);   
	});
}

function fetchAutocomplete(letters, res)
{
	http.get("http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=" + letters, function(data) 
	{
	    var json = '';
			var autoComplete = new Autocomplete();
    	data.on('data', function(d){
        	json += d;
    	});
    	data.on('end', function(){
				try{
					json = JSON.parse(json);
					var length = json.length >= 5 ? 5 : json.length;
					for(var i = 0; i < length; i++){
						autoComplete.autoItems.push(json[i].Symbol + " - " + json[i].Name + " (" + json[i].Exchange + ")");
					}
					autoComplete.letters = letters;
					console.log(autoComplete);
					res.send(autoComplete);
				}
				catch(e){
					res.send("ERROR");
					console.log(e);
				}
   	 	});
  }).on('error', function(e){
    console.log(e.message);   
  });
}