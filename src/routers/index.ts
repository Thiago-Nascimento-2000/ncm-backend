import { Router } from "express";
import DownloadNcmListController from "../controllers/DownloadNcmListController.js";
import SearchNcmController from "../controllers/SearchNcmController.js";
import SearchSendNcmController from "../controllers/SearchSendNcmController.js";
import ClientesAttController from "../controllers/ClientesAttController.js";

const routers = Router();

//faz download do arquivo ncm atualizado
routers.get("/download/ncm", DownloadNcmListController);

//faz a busca do ncm e retorna o resultado, valido ou vencido
routers.post("/search/ncm", SearchNcmController);

//consulta no banco de dados nexus compara com ncmData e retorna ncms invalidos
routers.get("/search/ncmlist", SearchSendNcmController);

//consulta api externa netbird e retorna info dos clientes
routers.get("/clientes", ClientesAttController);

export default routers;
