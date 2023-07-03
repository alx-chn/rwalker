import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from 'chart.js/auto';

// https://blog.quantinsti.com/random-walk/ 
// stock price today has no relation or influence on the stock price tomorrow, and the direction the stock price goes is entirely random and unpredictable.
// given enough trials, we are trying to find patterns in a seemingly random process. This helps us study a process and if possible, predict the outcome too.

// A Monte Carlo simulation is a model used to predict the probability of different outcomes when the intervention of random variables is present.
// The Law of Large Numbers is a fundamental concept in probability and statistics that says when you repeat an experiment many times, the average of the outcomes will get closer to the expected value. 

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
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [days, setDays] = useState(null);

	const apiKey = "BUQKXF1N7IKZLUFR";
	const symbol = props.symbol;
	const interval = "daily";


	async function fetchStockData(apiKey, symbol, interval) {
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

		const closePriceArray = Object.entries(closePriceMap);
		closePriceArray.reverse();
		const slice = [];
		const dailyReturn = [];
		for (let i = 10; i < closePriceArray.length; i++) {
			dailyReturn.push((closePriceArray[i][1] - closePriceArray[i-1][1])-1);
			slice.push(closePriceArray[i]);
		}
		const reversedClosePriceMap = Object.fromEntries(slice);

	   	setEndDate(Object.keys(reversedClosePriceMap)[Object.keys(reversedClosePriceMap).length -1]);
		setStartDate(Object.keys(reversedClosePriceMap)[0]);
		setDays(Object.keys(reversedClosePriceMap).length);
		
		setGraphData({
			labels: Object.keys(reversedClosePriceMap),
			datasets: [
				{
					label: "Adjusted Close Price",
					data: Object.values(reversedClosePriceMap),
					fill: false,
					backgroundColor: "rgb(255, 99, 132)",
					borderColor: "rgba(255, 99, 132, 0.2)",
				},

				{
					label: 'Random Walk Adjusted Close Price',
					data: Object.values(closePriceMap),
					fill: false,
					backgroundColor: 'rgb(75, 192, 192)',
					borderColor: 'rgba(75, 192, 192, 0.2)',
				}
			],
		});

	} catch (error) {
		console.error("Error fetching stock data:", error);
	}
	}

	useEffect(() => {
	fetchStockData(apiKey, symbol, interval);
	}, [apiKey, symbol, interval]);

	return (
	<div>
		<p>Historical prices of {symbol} from {startDate} to {endDate}: </p>
		<p>Duration: {days} days</p>
		{graphData && <Line data={graphData} />}
	</div>
	);
}

export default RandomWalk;