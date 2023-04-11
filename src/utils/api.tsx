import { getData } from "./asyncStorage";
import axios from "./axios";

const getAutorization = async () => {
  let token = await getData("token");

  //return `Bearer ${token?.slice(1, token.length - 1)}`;
  return `Bearer ${token?.slice(1, token.length - 1)}`;
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

  usuarioRegister: async (data: any) => {
    const request = await axios({
      method: "POST",
      data: data,
      url: "usuario",
    });
    return request;
  },

  usuarioGet: async () => {
    let authorization = await getAutorization();
    const result = await axios.get("usuario", {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  notesPost: async (data: any) => {
    let authorization = await getAutorization();

    const result = await axios.post("notes", data, {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  notesUpdate: async () => {
    let authorization = await getAutorization();
    const result = await axios.post("notes", {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  notesGet: async () => {
    let authorization = await getAutorization();
    const result = await axios.get("notes/obter-por-usuario", {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  notesUsuarioGet: async () => {
    let authorization = await getAutorization();
    const result = await axios.get("notes/obter-por-usuario", {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  archivesGet: async () => {
    let authorization = await getAutorization();
    const result = await axios.get("notes/obter-por-usuario-arquivado", {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  archivesDelete: async (id: any) => {
    let authorization = await getAutorization();
    const result = await axios.delete(`notes/arquivar?notaId=${id}`, {
      headers: {
        authorization,
      },
    });
  },

  trashGet: async () => {
    let authorization = await getAutorization();
    const result = await axios.get("notes/obter-por-usuario-lixeira", {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  trashDelete: async (id: any) => {
    let authorization = await getAutorization();
    const result = await axios.delete(`notes?notaId=${id}`, {
      headers: {
        authorization,
      },
    });
    return result.data;
  },
};

export default api;
