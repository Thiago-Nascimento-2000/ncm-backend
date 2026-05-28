import fs from 'fs';


const searchNcmInFile = (Codigo: string) => {
    const ncmData = JSON.parse(fs.readFileSync('./src/data/ncmData.json', 'utf-8'));
    const ncmInfo = ncmData.find((ncm: { Codigo: string }) => ncm.Codigo === Codigo);

    return ncmInfo;
}

export default searchNcmInFile;