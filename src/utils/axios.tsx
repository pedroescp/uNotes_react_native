import axios from "axios";

//IPV4 of server you use or of your machine
const instance = axios.create({
  baseURL: "http://192.168.18.12:10010/",
});

export default instance;