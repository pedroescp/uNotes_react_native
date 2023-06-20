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

  usuarioByIdGet: async () => {
    let authorization = await getAutorization();
    const result = await axios.get("usuario/obter-por-id", {
      headers: {
        authorization,
      },
    });
    return result.data;
  },


  usuarioPut: async (data: any) => {
    console.log(data);
    
    let authorization = await getAutorization();
      const request = await axios({
        method: "PUT",
        headers: {authorization},
        data: data,
        url: "usuario",
      });
    return request.data;
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

  notesUpdate: async (data: any) => {
    let authorization = await getAutorization();
    const result = await axios({
      method: "PUT",
      data: data,
      url: "notes",
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

  getAllCategorias: async () => {
    let authorization = await getAutorization();
    const result = await axios.get("categoria", {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  postCategorias: async (data: any) => {
    let authorization = await getAutorization();

    const result = await axios.post("categoria", data, {
      headers: {
        authorization,
      },
    });
    return result.data;
  },


  getAllDocumentos: async () => {
    let authorization = await getAutorization();
    const result = await axios.get("documentos", {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  
  getDocumento: async (data: any) => {
    let authorization = await getAutorization();

    const result = await axios.get(`documentos/obter-por-id?id=${data}`, {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  postDocumento: async (data: any) => {
    let authorization = await getAutorization();

    const result = await axios.post("documentos", data, {
      headers: {
        authorization,
      },
    });
    return result.data;
  },

  deleteCategoria: async (id: any) => {
    let authorization = await getAutorization();
    const result = await axios.delete(`categoria?notaId=${id}`, {
      headers: {
        authorization,
      },
    });
  },

  editCategoria: async (data: any) => {
    let authorization = await getAutorization();

    const result = await axios.put("categoria", data, {
      headers: {
        authorization,
      },
    });
    return result.data;
  },



};

export default api;
