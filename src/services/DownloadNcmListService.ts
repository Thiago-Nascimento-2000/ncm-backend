import axios from "axios";
import fs from "fs";
import z from "zod";

const responseSchema = z.object({
  Data_Ultima_Atualizacao_NCM: z.string(),
  Ato: z.string(),
  Nomenclaturas: z.array(
    z
      .object({
        Codigo: z.string().transform((cod) => {
          return cod.replace(/\D/g, "").padStart(8, "0").slice(0, 8);
        }),
        Descricao: z.string(),
        Data_Inicio: z.string(),
        Data_Fim: z.string(),
        Tipo_Ato_Ini: z.string(),
        Numero_Ato_Ini: z.string(),
        Ano_Ato_Ini: z.string(),
      })
      .loose(),
  ),
});

const DownloadNcmList = async () => {
  try {
    const ncmData = await axios.get(
      "https://portalunico.siscomex.gov.br/classif/api/publico/nomenclatura/download/json",
    );

    const formattedCodesNcm = responseSchema.parse(ncmData.data).Nomenclaturas;

    fs.writeFileSync(
      "./src/data/ncmData.json",
      JSON.stringify(formattedCodesNcm, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.error("Erro ao baixar os dados do NCM:", error);
  }
};

export default DownloadNcmList;
