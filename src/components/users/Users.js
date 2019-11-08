import React, { Component } from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import Search from "./Search";
import axios from "axios";
import Alert from "../layouts/Alert";
import { Link } from "react-router-dom";
export class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false,
      user: {},
      alert: null
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(res => {
        this.setState({ users: res.data, loading: false });
      });
  }
  searchUsers = (text, pumpkin) => {
    pumpkin = "pump";

    axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(res => {
        this.setState({ users: res.data.items, loading: false });
      });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };
  setAlert = message => {
    this.setState({ message: message });
  };
  render() {
    return (
      <div style={userStyle}>
        <div>
          <Alert alert={this.state.alert} />
          <Search searchUsers={this.searchUsers} setAlert={this.setAlert} />

          <button className='btn btn-dark btn-block' onClick={this.clearUsers}>
            Clear Search
          </button>
        </div>
        {this.state.users.map(user => this.loadProfile(user))}
      </div>
    );
  }

  loadProfile(user) {
    if (this.state.loading) {
      return Spinner();
    } else {
      return (
        <div key={user.id} className='card text-center'>
          <img
            src={user.avatar_url}
            alt=''
            className='round-img'
            style={{ width: "100px" }}
          ></img>
          <h2>{user.login}</h2>
          <h5>
            <div>
              <Link
                to={`/user/${user.login}`}
                className='btn btn-dark btn-sm my-1'
              >
                My GitHub
              </Link>
            </div>
          </h5>
        </div>
      );
    }
  }
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

function Spinner(props) {
  return (
    <div className='sweet-loading'>
      <BounceLoader
        css={override}
        sizeUnit={"px"}
        size={80}
        color={"#dc3545"}
      />
    </div>
  );
}
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export default Users;
