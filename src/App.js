import React from 'react';
import './App.css';
import WeatherDisplay from './WeatherDisplay.js';

let PLACES = [
    {name: 'Moscow', zip: 'Moscow'},
]

let object = JSON.parse (localStorage.getItem ('PLACES'));
PLACES = object;
    class App extends React.Component {
        constructor() {
                super();
                this.state = {
                activePlace: 0,
                value: '',
            };
        }

        onChangeHandler(event) {
            this.setState({value: event.target.value})
        }

        handleSubmit(event) {
            PLACES.push({name: this.state.value, zip: this.state.value});
            localStorage.setItem('PLACES', JSON.stringify(PLACES));
            console.log(PLACES)
            console.log(object);
            this.setState({value: ''})
            event.preventDefault();
        }

        render() {
            const activePlace = this.state.activePlace;
            return (
            <div className="App">

                <main>
                
                {PLACES.map((place, index) => (
                <button
                    key={index}
                    onClick={() => {
                    this.setState({ activePlace: index });
                    }}
                >
                    {place.name}
                </button>
                ))}

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Имя:
                        <input type="text" value={this.state.value} onChange={this.onChangeHandler.bind(this)} />
                    </label>
                        <input type="submit" value="Отправить" />
                </form>

                <WeatherDisplay
                key={activePlace}
                zip={PLACES[activePlace].zip}
                nameInput={PLACES[PLACES.length-1].name}
                />
                </main>
                <footer>
                </footer>
            </div>
            );
        }
    }

export default App;
