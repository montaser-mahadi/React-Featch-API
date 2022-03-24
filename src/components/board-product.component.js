import React from 'react';
import ProductService from '../services/product.service';
import "bootstrap/dist/css/bootstrap.min.css";

class BoardProduct extends React.Component {

 constructor(props){
	 super(props);
	 this.state ={
		 products:[]
	 }
 }
  
 componentDidMount(){
	 ProductService.getProductBoard().then((response) =>{
		 this.setState({products:response.data })
	 });
 }
 
 render(){
	 return(
		<div>
		<br></br><br></br>
		 <h1 className = "text-center"> Poduct List </h1>
		 <br></br><br></br>
			<table className = "table table striped">
			<thead>
				<tr>
				 <td>#</td>
				 <td>Product Name</td>
				 <td>Product Price</td>
				 <td>Qty</td>
				 <td>Tax</td>
				 <td>Created At</td>
				 <td>Updated At</td>
				</tr>
			</thead>
			<tbody>
				{
					this.state.products.map(
					product => 
					<tr key = {product.id}>
						<td>{product.id}</td>
						<td>{product.productName}</td>
						<td>{product.productPrice}</td>
						<td>{product.productQty}</td>
						<td>{product.productTax}%</td>
						<td>{product.createdAt}</td>
						<td>{product.updatedAt}</td>
					</tr>
					)
				}
			</tbody>
			</table>
		</div>
	 )
 }
}


export default BoardProduct
