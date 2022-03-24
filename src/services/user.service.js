import axios from 'axios';
import authHeader from './auth-header';

const USER_API = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(USER_API + 'all');
  }

  getUserBoard() {
    return axios.get(USER_API + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(USER_API + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(USER_API + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
