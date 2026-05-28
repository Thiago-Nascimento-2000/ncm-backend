import type { Request, Response } from 'express';
import z from 'zod';
import searchNcmInFile from '../services/SearchNcmService.js';

const ncmCodeSchema = z.object({
    Codigo: z.string().min(8).max(11)
})

const SearchNcmController = async (req: Request, res: Response) => {
    const { Codigo } = await ncmCodeSchema.parse(req.body);

    const formateCode = Codigo.replace(/\D/g, '');

    const returnSearchNcm = searchNcmInFile(formateCode);
    
    if (returnSearchNcm) {
        res.status(200).json(returnSearchNcm);
    } else {
        res.status(404).json({ message: 'NCM não encontrado :(' });
    }
}

export default SearchNcmController;