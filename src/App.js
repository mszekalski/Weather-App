import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      forecast: null,
      currentLocation: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.renderForecast = this.renderForecast.bind(this);
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const url = `https://api.aerisapi.com/forecasts/${encodeURIComponent(
      this.state.search
    )}?&format=json&filter=day&limit=7&client_id=tkJbjpmAGjFvVeka6qw09&client_secret=ASCzpZIb398ApFQyfdXD0kRBvJsxRAkr9PibwvhL
`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!json.success) {
          console.log("Oh no!");
        } else {
          console.log(json);
          this.setState({ forecast: json });
        }
      });
  }

  renderForecast(data) {
    let daysOfTheWeek = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday"
    };
    return data.response[0].periods.map((day, index) => {
      let dayOfTheWeek = daysOfTheWeek[new Date(day.dateTimeISO).getDay()];
      if (index === 0) dayOfTheWeek = "Today";
      return (
        <li key={`day_${index}`} className="day-container">
          <div className="weather-content-container">
            <div className="day-name">{dayOfTheWeek}</div>
            <div className="day-high">High: {day.maxTempF}</div>
            <div className="day-low">Low: {day.minTempF}</div>
            <div className="day-weather">{day.weather}</div>
          </div>
        </li>
      );
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <div className="weather-list-container">
            <ul className="weather-list">
              {this.state.forecast && this.renderForecast(this.state.forecast)}
            </ul>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="location">Enter your location: </label>
            <input
              id="location"
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
