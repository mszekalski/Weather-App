import React, { Component } from "react";
import "../App.css";
import "../slider.css";
import WeatherItem from "./weather_item.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      forecast: null,
      currentLocation: null,
      celsius: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTempChange = this.handleTempChange.bind(this);
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
          this.setState({ forecast: json, currentLocation: this.state.search });
        }
      });
  }

  renderCurrentLocation() {
    if (this.state.currentLocation === null) {
      return <div className="current-locatioon-div">No Location Selected</div>;
    } else {
      return (
        <div className="current-locatioon-div">
          Current Location: {this.state.currentLocation}
        </div>
      );
    }
  }

  handleTempChange() {
    return e => {
      this.setState({ celsius: e.target.checked });
    };
  }

  renderSliderText() {
    if (this.state.celsius === false) {
      return "Fº";
    } else {
      return "Cº";
    }
  }

  renderForecast(data) {
    return data.response[0].periods.map((day, index) => {
      return (
        <WeatherItem
          key={index}
          index={index}
          dayInfo={day}
          celsius={this.state.celsius}
        />
      );
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="content-div">
          <div className="current-location-container">
            {this.renderCurrentLocation()}
          </div>
          <div className="weather-list-container">
            <ul className="weather-list">
              {this.state.forecast && this.renderForecast(this.state.forecast)}
            </ul>
          </div>
          <div className="weather-form-container">
            <div className="form-content-container">
              <form className="weather-form" onSubmit={this.handleSubmit}>
                <label htmlFor="location">Enter your location: </label>
                <input
                  className="weather-input"
                  id="location"
                  type="text"
                  value={this.state.search}
                  onChange={this.handleChange}
                />
                <button className="weather-input-button" type="submit">
                  Submit
                </button>
              </form>
              <div className="slider-div">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={this.state.celsius}
                    onChange={this.handleTempChange()}
                  />
                  <span className="slider round" />
                </label>
                <div className="slider-text">{this.renderSliderText()}</div>
              </div>
            </div>
            <div className="instructions">
              You can search for a location by zip code, city and state (e.g New
              York, NY) or by city and country (e.g London, UK)
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
