import axios from "axios";
//const token = JSON.parse(localStorage.getItem('token'));
export default axios.create({
    baseURL:  "http://localhost:8000/api",
    headers: { "Access-Control-Allow-Origin": "*" },
    //headers: {"Authorization" : `Bearer ${token}`}
});

//https://kafo.90-soft.com/
///http://kafo.mem.sy
//"http://localhost:8000/api"
//"http://kafo.mem.sy/api"