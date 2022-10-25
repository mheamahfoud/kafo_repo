import axios from "axios";
const token = JSON.parse(localStorage.getItem('token'));
import { domainUrl } from "../../config/constants";
export default axios.create({
  baseURL:  domainUrl +"api",
  headers: { 'Authorization': 'Bearer ' + token }
});
//"185.216.133.81/kafo"
//"http://localhost:8000/api"http://185.216.133.81/kafo/
// baseURL:  "https://kafo.90-soft.com/api",