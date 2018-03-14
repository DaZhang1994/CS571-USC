<html>
	<head>
		<meta charset="utf-8" />
		<title>Stock Query</title>
		<script type="text/javascript">
			function clearSymbol()
			{
				document.getElementById("symbol").value = "";
			}
		</script>
	</head>
	<body>
		<form action="" method="get">
			<table align="center" bgcolor="#F3F3F3" frame="box" bordercolor="#BABABA">
				<tr>
					<td align="center" colspan="2">
						<font size="+3" style="font-family: cookie;line-height: 30px;">
							<em>Stock Search</em>
						</font>
						<hr color="#BABABA" />
					</td>
				</tr>
				<tr>
					<td>
						<font>Enter Stock Ticker Symbol:* </font>
					</td>
					<td>
						<input id="symbol" name="symbol" />
					</td>
				</tr>
				<tr>
					<td>
					</td>
					<td>
						<input type="submit" value="Search" style="background-color: #FFFFFF; border-radius: 6px; border: 1px solid; border-color: #BABABA;"/>
						<input type="button" value="Clear" onClick="clearSymbol()" style="background-color: #FFFFFF; border-radius: 6px; border: 1px solid; border-color: #BABABA;"/>	
					</td>		
				</tr>
				<tr>
					<td>
						<font style="font-family: cookie;">
							<em>* - Mandatory fields.</em>
						</font>
					</td>
				</tr>
			</table>	
		</form>	
		<?php 
			global $extractedDPV;
			function extractDPV($dpvJSON)
			{
				$dpv = json_decode($dpvJSON, true);
				$symbol = $dpv["Meta Data"]["2. Symbol"];
				$entities = $dpv["Time Series (Daily)"];	
				$timeStamp = $dpv["Meta Data"]["3. Last Refreshed"];
				foreach(array_keys($entities) as $dateStr)
					$dates[] = strtotime($dateStr);
				rsort($dates);
				$lastDay = date("Y-m-d", $dates[0]);
				$prevDay = date("Y-m-d", $dates[1]);
				$entity = $entities[$lastDay];
				$prevEntity = $entities[$prevDay];
				$close = $entity["4. close"];
				$open = $entity["1. open"];
				$prevClose = $prevEntity["4. close"];
				$change = bcsub($close, $prevClose, 4);
				$changePercent = bcdiv($change * 100, $prevClose, 2);
				$dayRange = $entity["3. low"] . "-" . $entity["2. high"];
				$volume = $entity["5. volume"];
				
				$extractedDPV = [
									"symbol" => $symbol,
									"close" => $close,
									"open" => $open,
									"prevClose" => $prevClose,
									"change" => $change,
									"changePercent" => $changePercent,
									"dayRange" => $dayRange,
									"volume" => $volume,
									"timeStamp" => $timeStamp
								];
				return $extractedDPV;
			}
			function displayTable($extractedDPV)
			{
				if(!empty($extractedDPV))
				{
					if($extractedDPV["change"] >= 0)
						$icon = "Green_Arrow_Up.png";
					else
						$icon = "Red_Arrow_Down.png";
					echo "<table align='center' width='800px' border='1'>";
					echo "<tr><td bgcolor='#F3F3F3'>Stock Ticker Symbol</td><td align='center' bgcolor='#FAFAFA'>" . $extractedDPV["symbol"] . "</td></tr>";
					echo "<tr><td bgcolor='#F3F3F3'>Close</td><td align='center' bgcolor='#FAFAFA'>" . $extractedDPV["close"] . "</td></tr>";
					echo "<tr><td bgcolor='#F3F3F3'>Open</td><td align='center' bgcolor='#FAFAFA'>" . $extractedDPV["open"] . "</td></tr>";
					echo "<tr><td bgcolor='#F3F3F3'>Previous Close</td><td align='center' bgcolor='#FAFAFA'>" . $extractedDPV["prevClose"] . "</td></tr>";
					echo "<tr><td bgcolor='#F3F3F3'>Change</td><td align='center' bgcolor='#FAFAFA'>" . $extractedDPV["change"] . "<img width='20px' height='20px' src='./icon/" . $icon . "' /></td></tr>";
					echo "<tr><td bgcolor='#F3F3F3'>Change Percent</td><td align='center' bgcolor='#FAFAFA'>" . $extractedDPV["changePercent"] . "%<img width='20px' height='20px' src='./icon/" . $icon . "' /></td></tr>";
					echo "<tr><td bgcolor='#F3F3F3'>Day's Range</td><td align='center' bgcolor='#FAFAFA'>" . $extractedDPV["dayRange"] . "</td></tr>";
					echo "<tr><td bgcolor='#F3F3F3'>Volume</td><td align='center' bgcolor='#FAFAFA'>" . $extractedDPV["volume"] . "</td></tr>";
					echo "<tr><td bgcolor='#F3F3F3'>TimeStamp</td><td align='center' bgcolor='#FAFAFA'>" . $extractedDPV["timeStamp"] . "</td></tr>";
					echo "<tr><td bgcolor='#F3F3F3'>Indicators</td><td align='center' bgcolor='#FAFAFA'>" . "</td></tr>";
					echo "</table>";
				}
			}
			if(isset($_GET["symbol"]))
			{
				$url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" . 
					   $_GET["symbol"] . 
					   "&apikey=I7GWB058GIM8LMC5";
				$dpvJSON = file_get_contents($url);
				displayTable(extractDPV($dpvJSON));
			}
		
		?>
	</body>
</html>