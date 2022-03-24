import React, { Component } from "react";

import UserService from "../services/user.service";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h5>API Call From The Server Site</h5>
		  <br></br>
		  <br></br>
		  <br></br>
		  <ul>
				  User Account and Roles
				  <br></br>
		  <a href="#"><h5><li>localhost:8080/api/auth/signin</li></h5></a>
		  <a href="#"><h5><li>localhost:8080/api/auth/signup</li></h5></a>
		  
		  <br></br><br></br>
		  		  Create Product And Products List
				  <br></br>
		  <a href="/product"><h5><li>localhost:8080/api/product/list</li></h5></a>
		  <a href="#"><h5><li>localhost:8080/api/product/create</li></h5></a>
		  
		  <br></br><br></br>
		  
				  Create Order And Orders List	
				  <br></br>
		  <a href="#"><h5><li>localhost:8080/api/order/list</li></h5></a>
		  <a href="#"><h5><li>localhost:8080/api/order/create</li></h5></a>
		  </ul>
        </header>
		
			
      </div>
    );
  }
}
