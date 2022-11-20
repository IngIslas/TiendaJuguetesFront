import axios from "axios";

class JuguetesAPI {
  static baseUrl = process.env.VUE_APP_API_URL + "Juguete/";

  static async Obtener() {
    return await axios.get(this.baseUrl + "GetJuguetes");
  }
  static async Insertar(params) {
    return await axios.post(this.baseUrl + "AgregarJuguete", params);
  }

  static async Actualizar(params) {
    return await axios.put(
      this.baseUrl + "ActualizarJuguete/" + params.Id,
      params
    );
  }

  static async Eliminar(Id) {
    return await axios.delete(this.baseUrl + "EliminarJuguete/" + Id);
  }
}

export default JuguetesAPI;
