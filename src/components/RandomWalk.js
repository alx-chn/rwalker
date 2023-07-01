import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from 'chart.js/auto';
 
// https://algotrading101.com/learn/yahoo-finance-api-guide/
// Yahoo Finance API is no longer public :(
// "twelve-data" API is used instead :) --> but it did not fetch the adjusted close price
// "Alpha Vantage" API is used instead :) --> https://portfoliooptimizer.io/blog/selecting-a-stock-market-data-web-api-not-so-simple/
// d28df2f13c05467e805bfe314facf710

// A starting point for understanding market behavior

// Efficient Market Hypothesis: 
// The Random Walk Model supports the Efficient Market Hypothesis, 
// suggesting that all available information is already factored into asset prices. 
// This idea has led to the development of passive investment strategies, 
// which have been successful for many investors. 
// Passive strategies typically have lower fees and expenses compared to active management, 
// making them an attractive choice for long-term investment.

// Challenging market predictions: 
// The Random Walk Model highlights the difficulty in predicting future price movements based on historical data. 
// This serves as a reminder for investors to be cautious when using technical analysis or other prediction methods and to consider other factors, 
// such as fundamentals and macroeconomic indicators, when making investment decisions.


function RandomWalk(props) {
	const [graphData, setGraphData] = useState(null);

	const apiKey = "BUQKXF1N7IKZLUFR";
	const symbol = props.symbol;
	const interval = "daily";
	const outputSize = 1;


	async function fetchStockData(apiKey, symbol, interval, outputSize) {
	// const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputSize}&apikey=${apiKey}`;
	const url = `https://www.alphavantage.co/query?function=TIME_SERIES_${interval.toUpperCase()}_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		const closePriceMap = {};
		const AllStockData = Object.values(data)[1];
		for (const dateTime in AllStockData) {
			if (AllStockData.hasOwnProperty(dateTime)) {
			  closePriceMap[dateTime] = AllStockData[dateTime]["4. close"];
			}
		}

	   	// setPrice(JSON.stringify(closePriceMap, null, 2));
		
		setGraphData({
			labels: Object.keys(closePriceMap).reverse(),
			datasets: [
				{
					label: "Adjusted Close Price",
					data: Object.values(closePriceMap).reverse(),
					fill: false,
					backgroundColor: "rgb(255, 99, 132)",
					borderColor: "rgba(255, 99, 132, 0.2)",
				},
			],
		});

	} catch (error) {
		console.error("Error fetching stock data:", error);
	}
	}

	useEffect(() => {
	fetchStockData(apiKey, symbol, interval, outputSize);
	}, [apiKey, symbol, interval, outputSize]);

	return (
	<div>
		<p>Historical prices of {symbol}: </p>
		{graphData && <Line data={graphData} />}
	</div>
	);
}

export default RandomWalk;