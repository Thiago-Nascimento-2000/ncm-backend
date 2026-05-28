import type { Request, Response } from 'express';
import autenticator from '../services/DownloadNcmListService.js';

const DownloadNcmListController = async (_: Request, res: Response) => {
    
    await autenticator();

    res.status(200).json({
        message: "Dados do NCM baixados com sucesso!",
        data: new Date().toLocaleString()
    })
}

export default DownloadNcmListController;