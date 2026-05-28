import { Router } from "express";
import DownloadNcmListController from "../controllers/DownloadNcmListController.js";
import SearchNcmController from "../controllers/SearchNcmController.js";
import SearchSendNcmController from "../controllers/SearchSendNcmController.js";

const routers = Router();

routers.get("/download-ncm", DownloadNcmListController);

routers.get('/search-ncm', SearchNcmController);

routers.get('/search-send-ncm-list', SearchSendNcmController);

export default routers;