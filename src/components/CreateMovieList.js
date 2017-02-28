import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class CreateMovieList extends React.Component {
  constructor() {
    super();
    let listId = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
    this.state={
      myList: {
        movies: []
      }
    }

    if (listId !== '0') {
      const url = 'https://mymovielist-af285.firebaseio.com/movielists.json';
        axios.get(url)
          .then((response) => {
            console.log(response);
            var list = response.data[listId];
            this.setState({
              myList: list
            });
          })
          .catch((error) => {
            console.log(error);
          })
    }

    this.onSearchTitleChange = this.onSearchTitleChange.bind(this);
    this.searchMovie = this.searchMovie.bind(this);
    this.addMovieToList = this.addMovieToList.bind(this);
    this.renderMyListSection = this.renderMyListSection.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
    this.onMovieListNameChange = this.onMovieListNameChange.bind(this);

  }
//search function to make api call to movie db
  searchMovie(e) {
    e.preventDefault();
    let url = "https://api.themoviedb.org/3/search/movie?"
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
    let list = this.state.myList;
    list.movies.push(movie);
    this.setState({myList: list});
  }
//delete function from mylist
  removeFromList(movie) {
    let list = this.state.myList;
    list.movies.splice(list.movies.indexOf(movie), 1);
    this.setState({myList: list});
  }

  saveMyList() {
    var list = this.state.myList;
    if (!list.listName) {
      list.listName = this.state.movieListName;
    }

    const url = 'https://mymovielist-af285.firebaseio.com/movielists.json';
    axios.post(url, list)
      .then(() => {
        alert('list saved');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onMovieListNameChange(e) {
    this.setState({
      movieListName: e.target.value
    });
  }

  renderSearchResults() {
 //if movie does not have poster then display default image holder
    if (this.state.searchResultMovies) {
      return (
        <ul className='listStyle'>
          {this.state.searchResultMovies.map((movie) => {
            if (!movie.poster_path) {
              var posterPath = 'https://slowrobotagogo.files.wordpress.com/2013/10/point-blank-polish-movie-poster-1967.jpg';
            }else{
              var posterPath = 'https://image.tmdb.org/t/p/w185/'
              + movie.poster_path;
            }
            //list movies from search and displays images
            return (
              <li key={movie.id} className='list-group-item'>
                <div>
                  <div>{movie.title}</div>
                  <div><img src={posterPath} className='posterStyle'/></div>
                  <div><button onClick={() => this.addMovieToList(movie)}>
                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      );
    } else {
      return
        <div>Search for some movies</div>;
    }

  }

  renderSearchSection() {
    const {
      title,
    } = this.props;
      return (
          <form className='navbar-form navbar-left'>
            <input type="text" className='form-control' placeholder="Search Movies"
              id={this.props.movieId}
              onChange={this.onSearchTitleChange}
              className='inputBoxStyle'/>
            <button className='btn btn-primary' onClick={this.searchMovie}>Search</button>
          </form>
      );
  }

  renderMyListSection() {
     // display movie titles with remove option
    return (
      <div className='sectionStyle'>
        <label>My New List, Hit Save before going to My Movie List</label>
        <ul className='list-group-item'>
          <input type='text'
            className='inputBoxStyle'
            placeholder='List Name'
            value={this.state.myList.listName}
            onChange={this.onMovieListNameChange}/>
            <p><button className='btn btn-primary' onClick={() => this.saveMyList()}>Save to My List</button></p>
             {this.state.myList.movies.map((movie) => {
              return (
              <li key={movie.id} className='list-group-item'>
               <div title={movie.title} className='movieTitleStyle'>{movie.title}</div>
               <button onClick={() => this.removeFromList(movie)}>
               <span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>

              </li>
              //SAVEMOVIELIST BUTTON

            )
          })}
        </ul>

      </div>
    )
  }

  render() {

    return (
        <div>
          <div id='titles' className='leftSectionStyle'>
            {this.renderSearchSection()}
            {this.renderSearchResults()}
          </div>
          <div id="myList">
            {this.renderMyListSection()}
          </div>
        </div>
    );
  }
}
export default CreateMovieList;
