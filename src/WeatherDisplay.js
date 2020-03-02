import React from 'react';
import './WeatherDisplay.scss';

class WeatherDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
        weatherData: null,
        };
    }

        componentDidMount() {
            const zip = this.props.zip;
            if (this.props.forecast === 'current') {
                const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
                    zip +
                    "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
                fetch(URL).then(res => res.json()).then(json => {
                    this.setState({
                        weatherData: json
                    });
                }).catch(err => {
                    console.log(err);
                });
            } else if (this.props.forecast === 'daily') {
                const URL = "http://api.openweathermap.org/data/2.5/forecast/?q=" +
                    zip +
                    "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
                fetch(URL).then(res => res.json()).then(json => {
                    this.setState({
                        weatherData: json
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        }

    render() {
        if (this.props.forecast==='current'){
            const weatherData = this.state.weatherData;
            if (!weatherData) {
                document.body.classList.add('loaded_hiding');
                document.querySelector('.preloader').style = 'display:block';
                window.setTimeout(function () {
                    document.querySelector('.preloader').style = 'opacity:1';
                    document.querySelector('.preloader').style = 'display:none';
                    document.body.classList.add('loaded');
                    document.body.classList.remove('loaded_hiding');
                    console.log('hello');
                }, 500);
                return <div>Loading</div>;
            } 
            const weather = weatherData.weather[0];
            console.log(weather);
            const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
            return (
            <div>
                <h1>
                {weather.main} in {weatherData.name}
                <img src={iconUrl} alt={weatherData.description} />
                </h1>
                <p>Current: {weatherData.main.temp}°</p>
                <p>High: {weatherData.main.temp_max}°</p>
                <p>Low: {weatherData.main.temp_min}°</p>
                <p>Wind Speed: {weatherData.wind.speed} km/hr</p>
            </div>
            );
            ///////////////////////////////////////////////////////////////////////////////
        } 
        if (this.props.forecast === 'daily') {
            const weatherData = this.state.weatherData;
            if (!weatherData) return <div>Loading</div>;
            const weather = weatherData.list[0].weather[0];
            const weatherItems=weatherData.list;
            console.log(weatherData.list);
            const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
            let now = new Date().getDate;
            return (
                <div className="weatherInfo">
                (<div>{weatherData.list.map((item,index) => 
                <div>
                <div>{index}Average {item.main.temp}</div>
                <div>{index}Minimum {item.main.temp_min}</div>
                <div>{index}Maximum {item.main.temp_max}</div>
                </div>)}</div>)
                </div>
                
            );
        };
    }

} 



export default WeatherDisplay;