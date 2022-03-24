import axios from "axios";
import authHeader from './auth-header';

const PRO_LIST_API = 'http://localhost:8080/api/product/';

class ProductService{
	
	//Featch API To Get List Of Product
  /*listOfProduct() {
    return axios.get();
      /*.then(res => {
        const producr = res.data;
        this.setState({ producr });
  })}*/
  
  getProductBoard() {
    return axios.get(PRO_LIST_API + 'list/', { headers: authHeader() });
  }
   
	// CAll API To Create A New Product 
	
	createProduct(productName, productPrice, productQty,productTax ) {
    return axios.post(PRO_LIST_API + "create", { headers: authHeader() } ,{
      productName,
      productPrice,
      productQty,
	  productTax
    });
  }
	
}

export default new ProductService();
