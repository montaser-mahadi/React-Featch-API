import React from 'react';
import OrderService from '../services/order.service';
import "bootstrap/dist/css/bootstrap.min.css";

class BoardOrder extends React.Component {

 constructor(props){
	 super(props);
	 this.state ={
		 orders:[]
	 }
 }
  
 componentDidMount(){
	 OrderService.getOrderBoard().then((response) =>{
		 this.setState({orders:response.data })
	 });
 }
 
 render(){
	 return(
		<div>
		<br></br><br></br>
		 <h1 className = "text-center"> Order List </h1>
		 <br></br><br></br>
			<table className = "table table striped">
			<thead>
				<tr>
				 <td>#</td>
				 <td>Product Name</td>
				 <td>Suplier</td>
				 <td>Order Date</td>
				 <td>Order User</td>
				 <td>Created At</td>
				 <td>Updated At</td>
				</tr>
			</thead>
			<tbody>
				{
					this.state.orders.map(
					order => 
					<tr key = {order.id}>
						<td>{order.id}</td>
						<td>{order.productName}</td>
						<td>{order.suplier}</td>
						<td>{order.OrderDate}</td>
						<td>{order.orderUser}</td>
						<td>{order.createdAt}</td>
						<td>{order.updatedAt}</td>
					</tr>
					)
				}
			</tbody>
			</table>
		</div>
	 )
 }
}


export default BoardOrder
