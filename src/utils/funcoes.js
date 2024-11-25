import fs from 'fs';
import path from 'path';

export async function fountExt(uploadsDir, nomeBase) {
    try {
        const files = await fs.promises.readdir(uploadsDir);
        const fileFound = files.find((file) => {
            const baseName = path.parse(file).name;
            return baseName === nomeBase;
        });

        return fileFound ? path.extname(fileFound) : null;
    } catch (error) {
        throw new Error("Erro ao acessar a pasta: " + error.message);
    }
}