import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.renderForecast = this.renderForecast.bind(this);
  }

  handleChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const url = `https://api.aerisapi.com/forecasts/${encodeURIComponent(
      this.state.location
    )}?&format=json&filter=day&limit=7&client_id=tkJbjpmAGjFvVeka6qw09&client_secret=ASCzpZIb398ApFQyfdXD0kRBvJsxRAkr9PibwvhL
`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!json.success) {
          console.log("Oh no!");
        } else {
          console.log(json);
          this.renderForecast(json);
        }
      });
  }

  renderForecast(data) {
    for (let i = 0; i < 7; i++) {
      let day = data.response[0].periods[i];
      console.log(day);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="location">Enter your location: </label>
            <input
              id="location"
              type="text"
              value={this.state.location}
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
