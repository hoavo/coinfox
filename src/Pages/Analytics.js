import { Component } from "react";
import PortfolioAnalytics from "../Components/PortfolioAnalytics";

class Analytics extends Component {
  constructor() {
    super();
  }

  render() {
    const coinz =
      Object.keys(this.props.coinz).length > 0 ? this.props.coinz : false;
    if (coinz) {
      return (
        <div className="Analytics">
          <PortfolioAnalytics {...this.props} />
        </div>
      );
    } else {
      return null; // @TODO add loading screen
    }
  }
}

export default Analytics;
