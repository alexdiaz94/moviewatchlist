import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/Home';
import MovieList from './components/MovieList';
import Person from './components/Person';
import NotFound from './components/NotFound';
import Contact from './components/Contact';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      movie: [],
      value: ''
    };
  }
//Need TO FIX
  componentDidMount() {
    axios.get('http://swapi.co/api/people/')
    .then((response) => {
      this.setState({ people: response.data.results });
    })
    .catch((err) => { console.error(err); });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="main">
            <Match exactly pattern="/" component={Home} />
            <Match
              exactly pattern="/movie"
              component={() => <MovieList movie={this.state.movie} />}
            />
            <Match
              exactly
              pattern="/movie/:id"
              component={({ params }) =>
                <Person person={this.state.movie[params.id - 1]} />
              }
            />
            <Match exactly pattern="/Contact" component={Contact} />
            <Match
              exactly pattern="/Contact"
              component={() => <Contact contact={this.state.movie} />}
            />
            <Miss component={NotFound} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
