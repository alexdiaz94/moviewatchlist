import React from 'react';
import CreateMovieList from './CreateMovieList';

class MyMovieList extends React.Component {
  render() {
    let moviefeed = this.props.movies.map((movie, i) => {
      console.log(movie)
      return (
        <CreateMovieList
        movie={movie.title}
        movieId={movie.id}
        key={movie.id}
        deleteRequest={this.props.deleteRequest}
        updateMovie={this.props.updateMovie}
        patchMovie={this.props.patchMovie}
        moviesState = {this.props.movies}
        />
      );
    });
    return (
      <ul>
        {moviefeed}
      </ul>
    );
  }
}
const propTypes = {
  movies: React.PropTypes.array.isRequired
};

MyMovieList.propTypes = propTypes;

export default MyMovieList;
