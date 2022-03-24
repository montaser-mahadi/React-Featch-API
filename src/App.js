import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
  
  

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import BoardProduct from './components/board-product.component';
import BoardOrder from './components/board-order.component';
import NewProduct from  './components/newProduct.component';
import NewOrder from  './components/newOrder.component';
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showNewOrder: false,
	  showProductBoard: false,
	  showOrderBoard: false,
	  showNewProduct: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showNewOrder: user.roles.includes("ROLE_ADMIN"),
		showProductBoard: user.roles.includes("ROLE_ADMIN"),
		showOrderBoard: user.roles.includes("ROLE_ADMIN"),
		showNewProduct: user.roles.includes("ROLE_ADMIN")
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showNewOrder: false,
	  showProductBoard: false,
	  showOrderBoard: false,
	  showNewProduct: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showNewOrder, showProductBoard ,
	showOrderBoard, showNewProduct} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Vreeny Software
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
			{showProductBoard && (
              <li className="nav-item">
                <Link to={"/product"} className="nav-link">
                  Product
                </Link>
              </li>
            )}
			{showNewProduct && (
              <li className="nav-item">
                <Link to={"/newProduct"} className="nav-link">
                  New Product
                </Link>
              </li>
            )}
			{showOrderBoard && (
              <li className="nav-item">
                <Link to={"/order"} className="nav-link">
                  order
                </Link>
              </li>
            )}
			{showNewOrder && (
              <li className="nav-item">
                <Link to={"/newOrder"} className="nav-link">
                  New Order
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
			 <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/newOrder" component={NewOrder} />
			<Route path="/product" component={BoardProduct}/>
			<Route path="/newProduct" component={NewProduct}/>
			<Route path="/order" component={BoardOrder}/> 
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
			
      </div>
    );
  }
}

export default App;
