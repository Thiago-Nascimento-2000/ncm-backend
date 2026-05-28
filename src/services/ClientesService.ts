import axios from "axios";
import ENV from "../env/index.js";

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://netbird.sygpdv.com.br/api/peers",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${ENV.NETBIRD_TOKEN}`,
  },
};

interface INames {
  name: string, 
}

const Clientes = async () => {

    try {
      const response = await axios.request(config);

      const clientesName = response.data.map((item: INames) => item.name);

      return {
        clientesName,
        data: response.data
      }

    } catch (error) {
        return {
            message: "Failed fetch",
            error: error
        }
    }

      

}

export default Clientes;