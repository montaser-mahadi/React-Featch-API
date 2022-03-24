import axios from "axios";
import authHeader from './auth-header';

const ORDER_LIST_API = 'http://localhost:8080/api/order/';

class OrderService{
	
	//Featch API To Get List Of Product
  
  getOrderBoard() {
    return axios.get(ORDER_LIST_API + 'list/', { headers: authHeader() });
  }
   
	// POST API To Create A New Order 
  createOrder(productName, suplier, orderUser) {
    return axios.post(ORDER_LIST_API + "create", { headers: authHeader() } ,{
      productName,
      suplier,
      orderUser
    });
  }

}
export default new OrderService();
