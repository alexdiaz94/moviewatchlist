import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class CreateMovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      myList: []
    }

    this.onSearchTitleChange = this.onSearchTitleChange.bind(this);
    this.searchMovie = this.searchMovie.bind(this);
    this.addMovieToList = this.addMovieToList.bind(this);
    this.renderMyListSection = this.renderMyListSection.bind(this);
    this.removeFromList = this.removeFromList.bind(this);

  }
//search function to make api call to movie db
  searchMovie(e) {
    e.preventDefault();
    var url = "https://api.themoviedb.org/3/search/movie?"
      + "api_key=17ebd09507f584e8437719819afa4883&language=en-US&query="
      + this.state.searchTitle + "&page=1"
      axios.get(url).then((response) => {
        this.setState({searchResultMovies: response.data.results});
        console.log(response);
      });
    //alert('hello: ' + this.state.searchTitle);
  }
//function for input search box
  onSearchTitleChange(e) {
    this.setState({searchTitle: e.target.value});
  }
//add function for movies
  addMovieToList(movie) {
    var list = this.state.myList;
    list.push(movie);
    this.setState({myList: list});
  }
//delete function from mylist
  removeFromList(movie) {
    var list = this.state.myList;
    list.splice(list.indexOf(movie), 1);
    this.setState({myList: list});
  }

  renderSearchResults() {
    var listStyle = {
      clear: 'both',
    };
    var listItemStyle = {
      width: '186px',
      border: '1px solid #ccc'
    };
    var posterStyle = {
      width: '185px'
    } //if movie does not have poster then display default image holder
    if (this.state.searchResultMovies) {
      return (
        <ul style={listStyle}>
          {this.state.searchResultMovies.map((movie) => {
            if (!movie.poster_path) {
              var posterPath = 'https://slowrobotagogo.files.wordpress.com/2013/10/point-blank-polish-movie-poster-1967.jpg';
            } else {
              var posterPath = 'https://image.tmdb.org/t/p/w185/'
              + movie.poster_path;
            }
            //list movies from search and displays images
            return (
              <li key={movie.id} style={listItemStyle}>
                <div>
                  <div>{movie.title}</div>
                  <div><img src={posterPath} style={posterStyle}/></div>
                  <div><button onClick={() => this.addMovieToList(movie)}>Add to list</button></div>
                </div>
              </li>
            )
          })}
        </ul>
      );
    } else {
      return <div>Search for some movies</div>;
    }

  }

  renderSearchSection() {
    const {
      title,
    } = this.props;
      var inputBoxStyle = {
        width: '150px',
        display: 'inline-block'
      }
      var formStyle = {
        float: 'left'
      }
      return (
          <form style={formStyle}>
            <input type="text" defaultValue={this.props.movie}
              id={this.props.movieId} onChange={this.onSearchTitleChange}
              style={inputBoxStyle}/>
            <button onClick={this.searchMovie}>Search</button>
          </form>
      );
    // }
  }

  renderMyListSection() {
    var sectionStyle = {
      float: 'left'
    }
    var listItemStyle = {
      textAlign: 'left',
      border: 'solid 1px #cfcfcf',
      padding: '2px 4px'

    }
    var movieTitleStyle = {
      float: 'left',
      width: '200px',

    } // display movie titles with remove option
    return (
      <div style={sectionStyle}>
      My New List
        <ul>
          {this.state.myList.map((movie) => {
            return (
              <li style={listItemStyle}>
                <div title={movie.title} style={movieTitleStyle}>{movie.title}</div>
                <button onClick={() => this.removeFromList(movie)}>Remove</button>
              </li>
            )
          })}
        </ul>

      </div>
    )
  }

  render() {
    var leftSectionStyle = {
      width: '250px',
      float: 'left'
    }
    return (
        <div>
          <div className="titles" style={leftSectionStyle}>
            {this.renderSearchSection()}
            {this.renderSearchResults()}
          </div>
          <div className="myList">
            {this.renderMyListSection()}
          </div>
        </div>
    );
  }
}
export default CreateMovieList;
