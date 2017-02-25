import React from 'react';

class Contact extends React.Component {

  constructor(people) {
    super();
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind();
    this.handleSubmit = this.handleSubmit.bind();
   }

  handleChange(e) {
    this.setState({value: e.target.value});
  }
  handleSubmit(e) {
    alert('Your infomation was submitted:' + this.state.value);
      event.preventDefault();
  }

  render() {
    return (
        <div>
          Email:
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <input type="submit" value="Submit" onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
export default Contact;
