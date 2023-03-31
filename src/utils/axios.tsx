import axios from "axios";

//IPV4 of server you use or of your machine
const instance = axios.create({
  baseURL: "http://10.10.118.153:10010/",
});

export default instance;