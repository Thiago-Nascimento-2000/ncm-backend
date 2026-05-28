import type { Request, Response } from "express";
import axios from "axios";
import ENV from "../env/index.js";

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://netbird.sygpdv.com.br/api/peers",
  headers: {
    Accept: "application/json",
    Authorization: ENV.NETBIRD_TOKEN!,
  },
};

const ClientesAttController = (_: Request, res: Response) => {
  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching client data", error });
    });
};

export default ClientesAttController;
