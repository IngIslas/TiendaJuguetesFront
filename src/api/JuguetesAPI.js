import axios from "axios";

class JuguetesAPI {
  static baseUrl = process.env.VUE_APP_API_URL + "Juguete/";

  static async Obtener() {
    return await axios.get(this.baseUrl + "GetJuguetes");
  }
}

export default JuguetesAPI;
