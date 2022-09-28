import { join } from "path";
import {existsSync} from "fs";
import {BadRequestException, Injectable } from '@nestjs/common';


@Injectable()
export class FilesService {

    getStaticProductImage(imgUrl: string) {

        const path = join(__dirname, '../../static/products', imgUrl);
        if (!existsSync(path)) {
            throw new BadRequestException('image not found');
        }
        return path;
    }
}
