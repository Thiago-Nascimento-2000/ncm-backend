import { response, type Request, type Response } from "express";
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

const ClientesAttController = (_: Request, res: Response) => {

  axios.request(config)
    .then((response) => {

      const clientesName = response.data.map((item: INames) => item.name)

      return res.status(200).json({
        clientesName,
        data: response.data
      });

    })
    .catch((error) => {

      return res.status(500).json({ message: "Error fetching client data", error });

    });

    
};

export default ClientesAttController;
