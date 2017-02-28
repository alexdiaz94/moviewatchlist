import React from 'react';
import { Link } from 'react-router';
import CreateMovieList from './CreateMovieList';
import axios from 'axios';

class MyMovieList extends React.Component {
  constructor() {
    super();
    this.state={
      myList: []
    }

    this.getList = this.getList.bind(this);
    this.renderList = this.renderList.bind(this);

  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    const url = 'https://mymovielist-af285.firebaseio.com/movielists.json';
    axios.get(url)
      .then((response) => {
        console.log(response);
        var lists = [];
        for (let listId in response.data) {
          let list = response.data[listId];
          list.listId = listId;
          lists.push(list);
        }
        this.setState({
          myList: lists
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  renderList() {
    if (!this.state.myList || this.state.myList.length === 0) {
      return <div>No Lists</div>
    }
    else {
      return (
      <div>
        My Lists:
        <ul>
          {this.state.myList.map((list) => {
            let link = "/CreateMovieList/" + list.listId;
            return (
              <li key={list.listId}>
                <Link
                  to={link}
                  activeOnlyWhenExact
                  activeClassName="active"
                >{list.listName}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
    }

  }
  render() {
    return (
      <div>{this.renderList()}</div>
    );
  }
}

export default MyMovieList;
