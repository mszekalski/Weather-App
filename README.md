# README

## How To Run

Git clone this repository, navigate to the folder and run the following commands.

```
bundle install
rails db:create
bundle exec rspec
```

## Overview and Structure

The goals as laid out in the instructions were the following.

- Create single page application using React and Node.js
- Make a call to a third party API and use the response to display some data
- Implement a responsive design that works both on desktop and mobile

For my application I chose to create a simple weather app. The third party API I used in this application is called Aeris Weather. I chose this particular third-party because I found it easy to use, it provided well organized information, and even came with access to weather related icons.

## Components

I have two simple react components in my application

- An encompassing "App" component
- Each future weather forecast is also it's own component

#### App

The App component contains the the forecast form, that calls the third party API in order to get the location data.

##### WeatherItem

The App component passes down the weather data into each WeatherItem component. This allows for easy re-rendering when new data is passed down through props.

## Thoughts and Future Development

#### Expanded Details

In the future I would like to add some additional components to my application, specifically a modal overlay so that a user could click on a day of the week and get more details about that day's weather.

#### Delegation of Responsiblities

The biggest technical challenge in designing the two models was thoughtfully delegating responsibilities. Both the Doctor and Appointment model make an effort to encapsulate repsonsbility, although in the Appointment#not_overlapped? method I found it necessary to get information from the Doctor model.
