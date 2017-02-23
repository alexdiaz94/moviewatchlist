import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class MovieListTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isEditing: false
    }

    this.onEditClick = this.onEditClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);

  }

  onEditClick(id) {
    this.setState({
      isEditing: true
    });
  }
  onCancelClick(id) {
    this.setState({
      isEditing: false
    });
  }
  onSaveClick(e) {
    e.preventDefault();

    // const oldTitle = this.props.title;
    // const newTitle = this.refs.editInput.value;
    // this.props.saveList(oldTitle, newTitle);

    this.props.patchMovie(this.props.movieId, this.props.moviesState);
    this.setState({
      isEditing: false
    });
  }
  onDeleteClick(e) {
    //console.log(this.props)
    this.props.deleteRequest(this.props.movieId)
    }

  renderListSection() {
    const {
      title,
    } = this.props;
    //console.log(this.props)
    // if (this.state.isEditing) {
      return (
        <li>
          <form onSubmit={this.onSaveClick}>
            <input type="text" defaultValue={this.props.movie}  id={this.props.movieId} onChange={this.props.updateMovie}/>
          </form>
        </li>
      );
    // }
  }
  renderEditSection() {
    if (this.state.isEditing) {
      return (
        <li>
          <button onClick={this.onSaveClick}>Save</button>
          <button onClick={this.onCancelClick}>Cancel</button>
        </li>
      );
    }
    return (
      <li>
          <button onClick={this.onEditClick}>Edit</button>
          <button onClick={this.onDeleteClick}>Delete</button>
        </li>
    );
  }
  render() {
    return (
      <ul>
        <div className="titles">
          {this.renderListSection()}
          {this.props.movie}
          {this.renderEditSection()}
        </div>
      </ul>
    );
  }
}
export default MovieListTitle;
