import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductService from "../services/product.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const vusername = value => {
  if (value.length < 4 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The product must be between 10 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 4 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleCreateProduct = this.handleCreateProduct.bind(this);
	
    this.state = {
	  productName: "",
      productPrice: "",
      productQty: "",
	  productTax: "",
      successful: false,
      message: ""
    };
  }

  handleCreateProduct(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      ProductService.createProduct(
	  this.state.productName,
      this.state.productPrice,
      this.state.productQty,
	  this.state.productTax
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
	
      <div className="col-md-12">
	  <header className="jumbotron">
          <h4>Create New Product</h4>
    </header>
        <div className="card card-container">
          <Form
            onSubmit={this.handleCreateProduct}
            ref={c => {
              this.form = c;
            }}
          >		  
		   {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={this.state.productName}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="text">Product Price</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="productPrice"
                    value={this.state.productPrice}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="productQty">Qty</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="productQty"
                    value={this.state.productQty}
                    onChange={this.onChangePassword}
                  />
                </div>
				<div className="form-group">
                  <label htmlFor="productTax">Tax</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="productTax"
                    value={this.state.productTax}
                    onChange={this.onChangeUsername}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">New</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
