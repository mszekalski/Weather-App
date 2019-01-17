import React from "react";

class WeatherItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let daysOfTheWeek = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday"
    };
    let dayOfTheWeek =
      daysOfTheWeek[new Date(this.props.dayInfo.dateTimeISO).getDay()];
    if (this.props.index === 0) dayOfTheWeek = "Today";
    let minTemp = this.props.dayInfo.minTempF;
    let maxTemp = this.props.dayInfo.maxTempF;
    let conditions = this.props.dayInfo.weather;
    if (this.props.celsius === true) {
      minTemp = this.props.dayInfo.minTempC;
      maxTemp = this.props.dayInfo.maxTempC;
    }
    return (
      <li className="day-container">
        <div className="weather-content-container">
          <div className="day-name">{dayOfTheWeek}</div>
          <div>
            <img
              src={`https://cdn.aerisapi.com/wxicons/v2/${
                this.props.dayInfo.icon
              }`}
            />
          </div>
          <div className="day-high">High: {maxTemp}</div>
          <div className="day-low">Low: {minTemp}</div>
          <div className="day-weather">{conditions}</div>
        </div>
      </li>
    );
  }
}

export default WeatherItem;
