import React, { Component } from "react";
import PropTypes from "prop-types";
export class Search extends Component {
  static propTypes = {
    setAlert: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }
  onChange = e => {
    this.setState({ text: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    if (this.state.text === "") {
      console.log("Please enter something");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text}
            onChange={this.onChange}
          ></input>
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-dark'
          ></input>
        </form>
      </div>
    );
  }
}

export default Search;
