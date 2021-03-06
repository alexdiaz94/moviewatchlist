import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class MovieList extends React.Component {

  render() {

    return (
      <form onSubmit={this.props.handleSubmit}>
        <input type="text" placeholder="Save My List" value={this.props.inputValue}
          onChange={this.props.handleChange}
        />
        <button>Add Movies</button>
      </form>
    );
  }
}
const propTypes = {
  inputValue: React.PropTypes.string.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired
};

MovieList.propTypes = propTypes;
export default MovieList;
