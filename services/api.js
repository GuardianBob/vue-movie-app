import { api } from "boot/axios";
import axios from 'axios'

class APIService {

  // =============== Storage Calls =================
  test_add(body) {
    return api.post(`/movie/test_add`, body);
  }

  addMovie(body) {
    return api.post(`/movie/add_movie`, body);
  }
}

export default new APIService();