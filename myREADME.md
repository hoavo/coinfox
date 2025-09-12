# Implementation approach

### 1. Portfolio Alert System
- The alert structure will store information such as id, coin, condition (above or below), targetPrice, and status.
- If the user is logged in, alert data will be stored in Blockstack under the coinfox.json path.
- If the user is a guest, alert data will be stored in local storage.
- Create a persistAlerts function in App.js to handle saving alerts (both logged-in and guest cases). Reuse this function for adding, removing, and updating alerts.
- In PriceAlert.js, implement the UI including the condition selector and target price input, and display it on the Coin Detail page. After the user enters data, add the alert for the selected coin.
- In AlertNotification.js, implement the UI to show all alerts, allowing the user to update alert status or remove alerts.
- Use polling to fetch real-time price updates by calling the https://api.coingecko.com/api/v3/coins/list API every second. Then, check all active alerts (skip those with dismissed status). If a coin’s price meets the alert condition, mark the alert as triggered and show a notification.

### 2.Analytics Dashboard
- Create mock data for the historical price updates of each coin and the historical invested cost of each coin.

> 24h/7d/30d portfolio performance
- Based on the price history, calculate the average price change percentage for 7 days and 30 days. (In code, use hardcoded values of 4.2% for 7d and 15.8% for 30d.)
- If the user selects 24h, show the total portfolio value.
- If the user selects 7d, show total portfolio value × average 7d change percentage.
- If the user selects 30d, show total portfolio value × average 30d change percentage.

> Best/worst performing coins in portfolio
- Calculate the return value for each coin as holding amount × current price.
- Sort coins in descending order of return value and display them in the UI (top = best performer, bottom = worst performer).

> Portfolio diversification metrics
- Calculate the Herfindahl–Hirschman Index (HHI) and convert it to a score using `Math.max(0, 100 - HHI * 100)`
- If score ≥ 80: Excellent
- If score ≥ 60:  Good
- If score ≥ 40: Moderate - Needs Improvement
- If score < 40: Poor - Highly Concentrated

> Risk assessment indicators
- Calculate portfolio volatility (degree of price fluctuation) from price history, but use a hardcoded value in code.
- if volatility < 10%: Low risk
- if 10% ≤ Volatility < 20%: Moderate risk
- if Volatility ≥ 20%: High risk

> Add portfolio value over time chart
- Calculate the portfolio value for each coin per day as holding amount × current price, then plot this over time in a chart (by coin).

> Implement comparison charts (portfolio vs. market indices)
- Calculate total portfolio value and total invested cost per day, and display in a comparison chart.

> Add technical indicators (moving averages, RSI)
- Calculate Simple Moving Average 20 (SMA20) using `sum of last 20 days’ prices / 20`
- Calculate Simple Moving Average 50 (SMA50) using `sum of last 50 days’ prices / 50`
- if SMA20 > SM50: Bullish trend
- if SMA20 ≤ SM50: Bearish trend
- Calculate RSI using `100 - (100 / (1 + (average gain / average loss)))`
- if RSI > 70: Overbought condition (sell signal)
- if 30 ≤ RSI ≤ 70: Neutral condition
- if RSI < 30: Oversold condition (buy signal)