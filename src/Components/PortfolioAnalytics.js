import React, { Component } from "react";
import Highcharts from "highcharts";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { $numberWithCommas, $currencySymbol } from "../Utils/Helpers";

const AnalyticsContainer = styled.div`
  padding: 24px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  min-height: 100vh;
  color: white;
`;

const Header = styled.div`
  margin-bottom: 32px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const HeaderContent = styled.div`
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #21ce99, #00d4aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: #aaa;
  margin: 0;
  font-size: 16px;
`;

const TimeframeToggle = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px;
  border-radius: 12px;
  width: fit-content;
`;

const TimeframeButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: ${(props) =>
    props.active ? "linear-gradient(135deg, #21ce99, #00d4aa)" : "transparent"};
  color: ${(props) => (props.active ? "white" : "#aaa")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #21ce99, #00d4aa)"
        : "rgba(255,255,255,0.1)"};
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(33, 206, 153, 0.3);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MetricTitle = styled.h3`
  color: #aaa;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) =>
    props.positive ? "#21ce99" : props.negative ? "#d82d2d" : "white"};
`;

const MetricChange = styled.div`
  font-size: 14px;
  color: ${(props) =>
    props.positive ? "#21ce99" : props.negative ? "#d82d2d" : "#aaa"};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
`;

const ChartTitle = styled.h3`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
`;

const PerformanceTable = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.1);
  font-size: 14px;
  font-weight: 600;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
    & > div:nth-child(4),
    & > div:nth-child(5) {
      display: none;
    }
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
    & > div:nth-child(4),
    & > div:nth-child(5) {
      display: none;
    }
  }
`;

const CoinName = styled.div`
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const CoinSymbol = styled.span`
  color: #aaa;
  font-size: 12px;
  margin-left: 8px;
  text-transform: uppercase;
`;

const TableValue = styled.div`
  color: ${(props) =>
    props.positive ? "#21ce99" : props.negative ? "#d82d2d" : "white"};
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const RiskIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin-bottom: 16px;
`;

const RiskLevel = styled.div`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.level) {
      case "low":
        return "rgba(33, 206, 153, 0.2)";
      case "moderate":
        return "rgba(255, 193, 7, 0.2)";
      case "high":
        return "rgba(220, 53, 69, 0.2)";
      default:
        return "rgba(255,255,255,0.1)";
    }
  }};
  color: ${(props) => {
    switch (props.level) {
      case "low":
        return "#21ce99";
      case "moderate":
        return "#ffc107";
      case "high":
        return "#dc3545";
      default:
        return "white";
    }
  }};
`;

const TechnicalIndicators = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const IndicatorCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const IndicatorTitle = styled.div`
  color: #aaa;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const IndicatorValue = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const IndicatorSignal = styled.div`
  color: ${(props) =>
    props.signal === "buy"
      ? "#21ce99"
      : props.signal === "sell"
      ? "#d82d2d"
      : "#aaa"};
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
`;

class PortfolioAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTimeframe: "24h",
      portfolioHistory: [],
      investedHistory: [],
      portfolioHistoryForEachCoin: [],
      performanceMetrics: {},
      riskMetrics: {},
      technicalIndicators: {},
      coinPerformance: [],
      diversificationMetrics: {},
    };
    this.chartRefs = {
      portfolioValue: null,
      comparison: null,
      performance: null,
    };
  }

  componentDidMount() {
    this.generatePortfolioHistory();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.coinz !== this.props.coinz ||
      prevProps.marketData !== this.props.marketData ||
      prevProps.totalPortfolio !== this.props.totalPortfolio
    ) {
      this.generatePortfolioHistory();
    }
    if (
      prevState.portfolioHistory !== this.state.portfolioHistory &&
      this.state.portfolioHistory.length > 0
    ) {
      this.calculateMetrics();
      this.createPortfolioChart();
      this.createComparisonChart();
    }
  }

  componentWillUnmount() {
    Object.values(this.chartRefs).forEach((chart) => {
      if (chart && chart.destroy) {
        chart.destroy();
      }
    });
  }

  calculateMetrics = () => {
    const { coinz, marketData, totalPortfolio } = this.props;

    if (!coinz || !marketData || !totalPortfolio) {
      return;
    }

    // Calculate performance metrics
    const performanceMetrics = this.calculatePerformanceMetrics();

    // Calculate con performance metrics
    const coinPerformance = this.calculateCoinPerformance();

    // Calculate risk metrics
    const riskMetrics = this.calculateRiskMetrics();

    // Calculate technical indicators
    const technicalIndicators = this.calculateTechnicalIndicators();

    // Calculate diversification metrics
    const diversificationMetrics = this.calculateDiversificationMetrics();

    this.setState({
      performanceMetrics,
      coinPerformance,
      riskMetrics,
      technicalIndicators,
      diversificationMetrics,
    });
  };

  calculatePerformanceMetrics = () => {
    const { totalPortfolio, marketData } = this.props;

    if (!totalPortfolio || !marketData) return {};

    const { totalValue, totalBasis } = totalPortfolio;
    const totalReturn = totalValue - totalBasis;
    const returnPercentage =
      totalBasis > 0 ? (totalReturn / totalBasis) * 100 : 0;

    // Calculate 24h, 7d, 30d changes (simulated data for demo)
    const changes = {
      "24h": this.calculateTimeframeChange("24h"),
      "7d": this.calculateTimeframeChange("7d"),
      "30d": this.calculateTimeframeChange("30d"),
    };

    return {
      totalReturn,
      returnPercentage,
      changes,
      totalValue,
      totalBasis,
    };
  };

  calculateTimeframeChange = (timeframe) => {
    const { coinz, marketData, exchangeRate } = this.props;

    if (!coinz || !marketData) return { value: 0, percentage: 0 };

    let totalChange = 0;
    let totalCurrentValue = 0;

    Object.keys(coinz).forEach((coin) => {
      if (marketData[coin] && marketData[coin].ticker) {
        const coinValue =
          coinz[coin].hodl * marketData[coin].ticker.price * exchangeRate;
        totalCurrentValue += coinValue;

        const changePercent = marketData[coin].ticker.change || 0;
        const adjustedChange =
          timeframe === "24h"
            ? changePercent
            : timeframe === "7d"
            ? changePercent * 4.2
            : changePercent * 15.8;

        totalChange += coinValue * (adjustedChange / 100);
      }
    });

    const changePercentage =
      totalCurrentValue > 0 ? (totalChange / totalCurrentValue) * 100 : 0;

    return {
      value: totalChange,
      percentage: changePercentage,
    };
  };

  calculateRiskMetrics = () => {
    const { coinz, marketData } = this.props;

    if (!coinz || !marketData) return {};

    // Calculate portfolio beta (simplified)
    const beta = 1.2; // Placeholder

    // Calculate VaR (Value at Risk) - simplified
    const var95 = -8.5; // Placeholder percentage

    // Risk level assessment
    const volatility = 15.5;
    const riskLevel =
      volatility < 10 ? "low" : volatility < 20 ? "moderate" : "high";

    return {
      beta,
      var95,
      riskLevel,
      volatility,
    };
  };

  calculateTechnicalIndicators = () => {
    return {
      sma20: this.calculateSMA(20),
      sma50: this.calculateSMA(50),
      rsi: this.calculateRSI(),
    };
  };

  calculateCoinPerformance = () => {
    const { coinz, marketData, exchangeRate } = this.props;

    if (!coinz || !marketData) return [];

    const performance = Object.keys(coinz)
      .map((coin) => {
        if (!marketData[coin] || !marketData[coin].ticker) {
          return null;
        }

        const ticker = marketData[coin].ticker;
        const hodlAmount = coinz[coin].hodl;
        const currentPrice = ticker.price * exchangeRate;
        const currentValue = hodlAmount * currentPrice;
        const costBasis = hodlAmount * coinz[coin].cost_basis;
        const returnTotalValue = currentValue - costBasis;
        const returnTotalPercentage = (returnTotalValue / costBasis) * 100;

        return {
          coin,
          symbol: coin.toUpperCase(),
          name: ticker.name || coin,
          currentValue,
          costBasis,
          returnTotalValue,
          returnTotalPercentage,
          allocation: 0,
        };
      })
      .filter(Boolean);

    // Calculate allocations
    const totalValue = performance.reduce((sum, coin) => sum + coin.currentValue, 0);
    performance.forEach(coin => {
      coin.allocation = totalValue > 0 ? (coin.currentValue / totalValue) * 100 : 0;
    });

    // Sort by performance
    return performance.sort((a, b) => b.returnTotal - a.returnTotal);
  };

  calculateDiversificationMetrics = () => {
    const { coinz, marketData } = this.props;

    if (!coinz || !marketData) return {};

    const coinPerformance = this.calculateCoinPerformance();
    const totalCoins = Object.keys(coinz).length;

    // Calculate Herfindahl-Hirschman Index (concentration)
    const hhi = coinPerformance.reduce((sum, coin) => {
      const weight = coin.allocation / 100;
      return sum + weight * weight;
    }, 0);

    // Diversification score (0-100, higher is better)
    const diversificationScore = Math.max(0, 100 - hhi * 100);

    return {
      totalCoins,
      diversificationScore,
    };
  };

  generatePortfolioHistory = () => {
    // Generate sample portfolio history data
    const now = Date.now();
    const historyTotalValue = [];
    const historyTotalBasis = [];
    const historyForEachCoin = {};

    if (!this.props.marketData) return;

    for (let i = 365; i >= 0; i--) {
      const date = now - i * 24 * 60 * 60 * 1000;
      let _totalValue = 0;
      let _totalBasis = 0;

      Object.keys(this.props.coinz).map(coin => {
        const baseCoinValue = this.props.coinz[coin].hodl * (this.props.marketData[coin]?.ticker?.price || 0) * this.props.exchangeRate;
        const baseCoinBasic = this.props.coinz[coin].hodl * (this.props.coinz[coin].cost_basis || 0) * this.props.exchangeRate;
        const randomWalkForValue = Math.sin(i / 30) * (baseCoinValue * 0.1);
        const randomWalkForBasic = Math.sin(i / 30) * (baseCoinBasic * 0.1);
        const _value = baseCoinValue + randomWalkForValue;
        const _basic = baseCoinBasic + randomWalkForBasic;
        _totalValue += _value;
        _totalBasis += _basic;
        historyForEachCoin[`${coin}`] = [
          ...(historyForEachCoin?.[`${coin}`] ?? []),
          [date, _value],
        ];
      })

      historyTotalValue.push([date, _totalValue]);
      historyTotalBasis.push([date, _totalBasis]);
    }

    this.setState({ 
      portfolioHistory: historyTotalValue,
      investedHistory: historyTotalBasis,
      portfolioHistoryForEachCoin: historyForEachCoin,
    });
  };

  getHistoricalPrices = () => this.state.portfolioHistory.map(item => item?.[1] || 0);

  handleTimeframeChange = (timeframe) => {
    this.setState({ activeTimeframe: timeframe });
  };

  getDiversificationAssessment = (score) => {
    if (score >= 80) {
      return {
        text: "Excellent - Well Diversified",
        color: "#21ce99",
      };
    } else if (score >= 60) {
      return {
        text: "Good - Stable & Low Volatility",
        color: "#21ce99",
      };
    } else if (score >= 40) {
      return {
        text: "Moderate - Needs Improvement",
        color: "#ffc107",
      };
    } else {
      return {
        text: "Poor - Highly Concentrated",
        color: "#d82d2d",
      };
    }
  };

  createPortfolioChart = () => {
    const { portfolioHistoryForEachCoin } = this.state;
    const { currency } = this.props;

    if (!Object.keys(portfolioHistoryForEachCoin).length) return;

    const options = {
      credits: false,
      chart: {
        type: "line",
        height: 300,
        backgroundColor: "transparent",
      },
      title: {
        text: null,
      },
      xAxis: {
        type: "datetime",
        lineColor: "#444",
        tickColor: "#444",
        gridLineColor: "#444",
        labels: {
          style: { color: "#aaa" },
        },
      },
      yAxis: {
        title: { text: null },
        gridLineColor: "#444",
        labels: {
          style: { color: "#aaa" },
          formatter: function () {
            return $currencySymbol(currency) + $numberWithCommas(this.value);
          },
        },
      },
      legend: { enabled: true, itemStyle: { color: "#aaa" }, },
      plotOptions: {
        line: {
          lineWidth: 2,
          marker: { enabled: false },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        borderColor: "#444",
        style: { color: "white" },
        formatter: function () {
          return `<strong>${$currencySymbol(currency)}${$numberWithCommas(
            this.y.toFixed(2)
          )}</strong><br/>${new Date(this.x).toLocaleDateString()}`;
        },
      },
      series: Object.keys(portfolioHistoryForEachCoin).map(coinKey => ({
        name: coinKey,
        data: portfolioHistoryForEachCoin[coinKey],
        color: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
      })),
    };

    this.chartRefs.portfolioValue = new Highcharts.Chart(
      "portfolio-chart-container",
      options
    );
  };

  createComparisonChart = () => {
    // Create comparison chart vs market indices
    const { portfolioHistory, investedHistory } = this.state;
    const { currency } = this.props;

    if (!portfolioHistory.length || !investedHistory.length) return;

    const options = {
      credits: false,
      chart: {
        type: "line",
        height: 300,
        backgroundColor: "transparent",
      },
      title: { text: null },
      xAxis: {
        type: "datetime",
        lineColor: "#444",
        tickColor: "#444",
        gridLineColor: "#444",
        labels: { style: { color: "#aaa" } },
      },
      yAxis: {
        title: { text: null },
        gridLineColor: "#444",
        labels: {
          style: { color: "#aaa" },
          formatter: function () {
            return $currencySymbol(currency) + $numberWithCommas(this.value);
          },
        },
      },
      legend: {
        enabled: true,
        itemStyle: { color: "#aaa" },
      },
      plotOptions: {
        line: {
          lineWidth: 2,
          marker: { enabled: false },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        borderColor: "#444",
        style: { color: "white" },
        shared: true,
      },
      series: [
        {
          name: "Invested",
          data: investedHistory,
          color: "#21ce99",
        },
        {
          name: "Portfolio",
          data: portfolioHistory,
          color: "#f7931a",
        },
      ],
    };

    this.chartRefs.comparison = new Highcharts.Chart(
      "comparison-chart-container",
      options
    );
  };

  calculateSMA = (period) => {
    const prices = this.getHistoricalPrices();
    if (prices.length < period) return null;
    
    const sum = prices.slice(-period).reduce((sum, price) => sum + price, 0);
    return sum / period;
  };

  calculateRSI = () => {
    const prices = this.getHistoricalPrices();
    const period = prices.length;
    
    let gains = [];
    let losses = [];
    
    for (let i = 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }
    
    const avgGain = gains.slice(-period).reduce((sum, gain) => sum + gain, 0) / period;
    const avgLoss = losses.slice(-period).reduce((sum, loss) => sum + loss, 0) / period;
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    
    return rsi;
  };

  render() {
    const {
      activeTimeframe,
      performanceMetrics,
      riskMetrics,
      technicalIndicators,
      coinPerformance,
      diversificationMetrics,
    } = this.state;

    const { currency } = this.props;

    const curSymbol = $currencySymbol(currency);
    const currentChange = performanceMetrics.changes?.[activeTimeframe] || {
      value: 0,
      percentage: 0,
    };

    const home = this.props.blockstack ? '/blockstack' : '/';

    return (
      <AnalyticsContainer>
        <Header>
          <HeaderContent>
            <Title>Portfolio Analytics</Title>
            <Subtitle>
              Comprehensive insights into your crypto portfolio performance
            </Subtitle>
          </HeaderContent>
          <Link className="coinClose" to={home}><i className="btn-menu fa fa-lg fa-times" aria-hidden="true"></i></Link>
        </Header>

        <TimeframeToggle>
          {["24h", "7d", "30d"].map((timeframe) => (
            <TimeframeButton
              key={timeframe}
              active={activeTimeframe === timeframe}
              onClick={() => this.handleTimeframeChange(timeframe)}
            >
              {timeframe}
            </TimeframeButton>
          ))}
        </TimeframeToggle>

        <MetricsGrid>
          <MetricCard>
            <MetricHeader>
              <MetricTitle>Portfolio Value</MetricTitle>
            </MetricHeader>
            <MetricValue>
              {curSymbol}
              {$numberWithCommas(
                performanceMetrics.totalValue?.toFixed(2) || "0.00"
              )}
            </MetricValue>
            <MetricChange
              positive={currentChange.percentage > 0}
              negative={currentChange.percentage < 0}
            >
              {currentChange.percentage > 0
                ? "↗"
                : currentChange.percentage < 0
                ? "↘"
                : "→"}
              {curSymbol}
              {$numberWithCommas(Math.abs(currentChange.value).toFixed(5))}(
              {Math.abs(currentChange.percentage).toFixed(5)}%)
            </MetricChange>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <MetricTitle>Diversification Score</MetricTitle>
            </MetricHeader>
            <MetricValue>
              {diversificationMetrics.diversificationScore?.toFixed(0) || "0"}
              /100
            </MetricValue>
            <MetricChange>
              {(() => {
                const score = diversificationMetrics.diversificationScore || 0;
                const assessment = this.getDiversificationAssessment(score);
                return (
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        marginTop: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      {diversificationMetrics.totalCoins || 0} coins in
                      portfolio
                    </div>
                    <div
                      style={{
                        color: assessment.color,
                        fontWeight: "600",
                        marginBottom: "4px",
                      }}
                    >
                      {assessment.text}
                    </div>
                  </div>
                );
              })()}
            </MetricChange>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <MetricTitle>Risk Assessment</MetricTitle>
            </MetricHeader>
            <RiskIndicator>
              <RiskLevel level={riskMetrics.riskLevel}>
                {riskMetrics.riskLevel || "Unknown"} Risk
              </RiskLevel>
              <div>
                <div style={{ fontSize: "14px", color: "#aaa" }}>
                  Volatility: {riskMetrics.volatility?.toFixed(1) || "0.0"}%
                </div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  VaR (95%): {riskMetrics.var95?.toFixed(1) || "0.0"}%
                </div>
              </div>
            </RiskIndicator>
          </MetricCard>
        </MetricsGrid>

        <ChartContainer>
          <ChartTitle>Portfolio Value Over Time</ChartTitle>
          <div id="portfolio-chart-container" style={{ height: "300px" }}></div>
        </ChartContainer>

        <ChartContainer>
          <ChartTitle>Performance Comparison</ChartTitle>
          <div
            id="comparison-chart-container"
            style={{ height: "300px" }}
          ></div>
        </ChartContainer>

        <ChartContainer>
          <ChartTitle>Best & Worst Performing Coins</ChartTitle>
          <PerformanceTable>
            <TableHeader>
              <div>Coin</div>
              <div>Return %</div>
              <div>Total Return</div>
            </TableHeader>
            {coinPerformance.map((coin, index) => (
              <TableRow key={coin.coin}>
                <CoinName>
                  {coin.name}
                  <CoinSymbol>{coin.symbol}</CoinSymbol>
                </CoinName>
                <TableValue
                  positive={coin.returnTotalPercentage > 0}
                  negative={coin.returnTotalPercentage < 0}
                >
                  {coin.returnTotalPercentage > 0 ? "+" : ""}
                  {coin.returnTotalPercentage.toFixed(2)}%
                </TableValue>
                <TableValue
                  positive={coin.returnTotalValue > 0}
                  negative={coin.returnTotalValue < 0}
                >
                  {coin.returnTotalValue > 0 ? "+" : ""}
                  {coin.returnTotalValue.toFixed(2)}
                </TableValue>
              </TableRow>
            ))}
          </PerformanceTable>
        </ChartContainer>

        <ChartContainer>
          <ChartTitle>Technical Indicators</ChartTitle>
          <TechnicalIndicators>
            <IndicatorCard>
              <IndicatorTitle>SMA 20</IndicatorTitle>
              <IndicatorValue>
                {curSymbol}
                {$numberWithCommas(
                  technicalIndicators.sma20?.toFixed(5) || "0.00"
                )}
              </IndicatorValue>
              <IndicatorSignal
                signal={
                  technicalIndicators.sma20 > technicalIndicators.sma50
                    ? "buy"
                    : "sell"
                }
              >
                {technicalIndicators.sma20 > technicalIndicators.sma50
                  ? "Bullish"
                  : "Bearish"}{" "}
                Trend
              </IndicatorSignal>
            </IndicatorCard>

            <IndicatorCard>
              <IndicatorTitle>SMA 50</IndicatorTitle>
              <IndicatorValue>
                {curSymbol}
                {$numberWithCommas(
                  technicalIndicators.sma50?.toFixed(5) || "0.00"
                )}
              </IndicatorValue>
              <IndicatorSignal>Long-term average</IndicatorSignal>
            </IndicatorCard>

            <IndicatorCard>
              <IndicatorTitle>RSI</IndicatorTitle>
              <IndicatorValue>
                {technicalIndicators.rsi?.toFixed(1) || "0.0"}
              </IndicatorValue>
              <IndicatorSignal
                signal={
                  technicalIndicators.rsi > 70
                    ? "sell"
                    : technicalIndicators.rsi < 30
                    ? "buy"
                    : "neutral"
                }
              >
                {technicalIndicators.rsi > 70
                  ? "Overbought"
                  : technicalIndicators.rsi < 30
                  ? "Oversold"
                  : "Neutral"}
              </IndicatorSignal>
            </IndicatorCard>
          </TechnicalIndicators>
        </ChartContainer>
      </AnalyticsContainer>
    );
  }
}

export default PortfolioAnalytics;
