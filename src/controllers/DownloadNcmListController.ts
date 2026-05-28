import type { Request, Response } from 'express';
import DownloadNcmList from '../services/DownloadNcmListService.js';

const DownloadNcmListController = async (_: Request, res: Response) => {
    
    await DownloadNcmList();

    res.status(200).json({
        message: "Dados do NCM baixados com sucesso!",
        data: new Date().toLocaleString()
    })
}

export default DownloadNcmListController;