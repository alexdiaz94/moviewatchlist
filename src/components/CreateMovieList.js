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
    list.push(movie);
    this.setState({myList: list});
  }
//delete function from mylist
  removeFromList(movie) {
    let list = this.state.myList;
    list.splice(list.indexOf(movie), 1);
    this.setState({myList: list});
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
              <li key={movie.id} className='listItemStyle'>
                <div>
                  <div>{movie.title}</div>
                  <div><img src={posterPath} className='posterStyle'/></div>
                  <div><button onClick={() => this.addMovieToList(movie)}>Add to list</button></div>
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
          <form className='formStyle'>
            <input type="text" placeholder="Search Movies"
              defaultValue={this.props.movie}
              id={this.props.movieId}
              onChange={this.onSearchTitleChange}
              className='inputBoxStyle'/>
            <button onClick={this.searchMovie}>Search</button>
          </form>
      );
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
      <div className='sectionStyle'>
      My New List
        <ul>
          {this.state.myList.map((movie) => {
            return (
              <li key={movie.id} className='listItemStyle'>
                <div title={movie.title} className='movieTitleStyle'>{movie.title}</div>
                <button onClick={() => this.removeFromList(movie)}>Remove</button>
                <div><button onClick={() => this.saveMyList(movie)}>Save My List</button></div>
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
