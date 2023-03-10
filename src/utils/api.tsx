import axios from "./axios";
let token = localStorage.getItem("token");
const headers = {
  authorization: `Bearer ${token?.slice(1, token.length - 1)}`,
};

const api = {
  //TODO  refator this exemple
  usuarioAuth: async (data: any) => {
    const request = await axios({
      method: "POST",
      data: data,
      url: "usuario/autenticar",
    });
    return request;
  },
};
