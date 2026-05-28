import mysql, { type RowDataPacket } from 'mysql2/promise';
import fs from 'fs';
import { writeToPath } from '@fast-csv/format';
import path from 'path';
import ENV from '../env/index.js';

interface INcmDb extends RowDataPacket {
    ncm: string;
}

interface IResultNcm extends RowDataPacket {
    CODIGO_BARRA: string;
    DESCRICAO: string;
    NCM: string;
    FK_COD_LOJA: number;
    TOTAL_POR_CODIGO: number;
    ULTIMA_DATA_VENDA: Date;
}

const DownloadNcm = async () => {
    const connection = await mysql.createConnection({
        host: ENV.DB_HOST!,
        user: ENV.DB_USER!,
        password: ENV.DB_PASSWORD!,
        database: ENV.DB_DATABASE!
    });

    //lê arquivo
    const ncmJsonList = JSON.parse(
        fs.readFileSync('./src/data/ncmData.json', 'utf-8')
    );

    //faz set apenas dos codigos ncm
    const collectAllNcmCodes = new Set(
        ncmJsonList.map((cod: { Codigo: string }) => cod.Codigo)
    );

    //busca todos os ncms do banco nexus
    const [ncmCodesFromDb] = await connection.query<INcmDb[]>(
        'SELECT DISTINCT ncm FROM produto order by PK_PROD'
    );

    //compara os nmcs da busca do nexus com set de codigos ncm
    const ncmInvalidedCodes = ncmCodesFromDb.filter (
        (ncm: INcmDb) => !collectAllNcmCodes.has(ncm.ncm)
    );

    // evita query inválida
    if (ncmInvalidedCodes.length === 0) {
        return {
            message: "Nenhum código NCM inválido encontrado.",
            ncmValidedCodesFromDb: []
        };
    }

    //formata para o select IN
    const ncmCodesFromDbFormatted = ncmInvalidedCodes.map((ncm: { ncm: string }) => `'${ncm.ncm}'`).join(', ');

    const [ncmValidedCodesFromDb] = await connection.query<IResultNcm[]>(
        `SELECT p.CODIGO_BARRA, p.DESCRICAO, p.NCM, p.FK_COD_LOJA,
        COUNT(p.PK_PROD) AS total_por_codigo,
        MAX(CAST(v.DATA_HORA AS DATE)) AS ultima_data_venda
        FROM venda v JOIN produto p ON v.FK_COD_PRODUTO = p.PK_PROD
        WHERE p.NCM IN (${ncmCodesFromDbFormatted})
        AND v.DATA_HORA >= DATE_SUB(DATE_FORMAT(CURRENT_DATE, '%Y-%m-01'), INTERVAL 3 MONTH)
        AND v.DATA_HORA < DATE_ADD(DATE_FORMAT(CURRENT_DATE, '%Y-%m-01'), INTERVAL 1 MONTH)
        GROUP BY p.PK_PROD, p.CODIGO_BARRA, p.DESCRICAO, p.NCM, p.FK_COD_LOJA
        ORDER BY p.NCM, ultima_data_venda DESC, total_por_codigo`
    );

    const rowsTable = ncmValidedCodesFromDb.map((item: IResultNcm) => {
            return {   
                CODIGO_BARRA: item.CODIGO_BARRA,
                DESCRICAO: item.DESCRICAO,
                NCM: item.NCM,
                FK_COD_LOJA: item.FK_COD_LOJA,
                TOTAL_POR_CODIGO: item.TOTAL_POR_CODIGO,
                ULTIMA_DATA_VENDA: item.ULTIMA_DATA_VENDA
            }
    })

    const filePath = path.resolve('src/data/ncmPlanilha.csv');

    await new Promise((resolve, reject) => {
        writeToPath(filePath, rowsTable, { headers: true })
            .on('finish', resolve)
            .on('error', reject);
    });

    return filePath;

};

export default DownloadNcm;