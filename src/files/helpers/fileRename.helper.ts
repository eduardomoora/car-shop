
import { v4 as uuid} from "uuid";

export const fileRename = (req: Express.Request, file: Express.Multer.File, callback:Function )=> {
    if (!file) return callback(new Error('File is empty'), false);

    const typeFile = file.mimetype.split('/')[1].toLowerCase();

    const fileName = `${uuid()}.${typeFile}`;


   callback(null,fileName)

}
