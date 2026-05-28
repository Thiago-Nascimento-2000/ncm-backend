import type { Request, Response } from 'express';
import DownloadNcm from '../services/SearchSendNcmService.js';


const SearchSendNcmController = async (_: Request, res: Response) => {

    const filePath = (await DownloadNcm()).toString();

    res.status(200).download(filePath);
}

export default SearchSendNcmController;