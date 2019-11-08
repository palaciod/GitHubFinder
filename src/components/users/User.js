import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export class User extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false,
      user: {},
      alert: null,
      repos: []
    };
  }
  getUserRepos = async username => {
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc`
    );
    this.setState({ repos: res.data });
  };
  getUser = async username => {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    this.setState({ user: res.data, loading: false });
  };
  componentDidMount() {
    const username = this.props.match.params.login;
    this.getUser(username);
    this.getUserRepos(username);
  }
  render() {
    return (
      <React.Fragment>
        <Link to='/' className='btn btn-dark'>
          Back to Search
        </Link>
        Hireable: {this.state.user.hireable}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={this.state.user.avatar_url}
              className='round-img'
              alt=''
              style={{ width: "150px" }}
            ></img>
            <h1>{this.state.user.name}</h1>
            <p>Location: {this.state.user.location}</p>
          </div>
          <div>
            {this.state.user.bio && (
              <React.Fragment>
                <h3>Bio</h3>
                <p>{this.state.user.bio}</p>
              </React.Fragment>
            )}
            <a href={this.state.user.html_url} className='btn btn-dark my-1'>
              Visit GitHub Page
            </a>
            <ul>
              <li>
                {this.state.user.login && (
                  <React.Fragment>
                    <div>
                      <h3>Username:</h3> {this.state.user.login}
                    </div>
                  </React.Fragment>
                )}
              </li>
              <li>
                {this.state.user.company && (
                  <React.Fragment>
                    <div>
                      <h3>Company:</h3> {this.state.user.company}
                    </div>
                  </React.Fragment>
                )}
              </li>
              <li>
                {this.state.user.blog && (
                  <React.Fragment>
                    <div>
                      <h3>Website:</h3> {this.state.user.blog}
                    </div>
                  </React.Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card grid-2'>
          {this.state.repos.map(currentRepo => {
            return (
              <div key={currentRepo.id}>
                <a href={currentRepo.html_url}>{currentRepo.name}</a>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default User;
