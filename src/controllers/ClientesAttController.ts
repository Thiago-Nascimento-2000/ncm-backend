import { type Request, type Response } from "express";
import Clientes from "../services/ClientesService.js"


const ClientesAttController = async (_: Request, res: Response) => {

  try {
    const clientes = await Clientes();

    res.status(200).json({
      clientes
    })

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar clientes",
      error,
    });
  } 
};

export default ClientesAttController;
