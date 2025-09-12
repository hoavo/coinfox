export const shouldTriggerAlert = (alert, marketDate, exchangeRate) => {
  const coin = alert.coin.toLowerCase();
  const price =
    marketDate[coin] && marketDate[coin].ticker
      ? Number(marketDate[coin].ticker.price) * exchangeRate
      : 0;

  const shouldTrigger =
    alert.condition === "above"
      ? price >= alert.targetPrice
      : price <= alert.targetPrice;
  return shouldTrigger;
};
