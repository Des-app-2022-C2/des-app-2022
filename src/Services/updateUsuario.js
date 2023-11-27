import axios from 'axios';


export default async function updateUsuario(id, data) {
    const body = JSON.stringify(data);
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/usuario/update/${id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  