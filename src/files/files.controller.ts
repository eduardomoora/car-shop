import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Post, Res,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { Response } from 'express';
import {FilesService} from './files.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {ConfigService} from "@nestjs/config";
import {fileFilter, fileRename} from "./helpers";
import {diskStorage} from "multer";


@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService,
                private readonly configService:ConfigService) {
    }


    @Get('product/:imageName')
    findOneProduct(
        @Res() res: Response,
        @Param('imageName') imgUrl: string) {
        const path = this.filesService.getStaticProductImage(imgUrl);
        res.sendFile(path);
    }


    @Post('product')
    @UseInterceptors(FileInterceptor(
        'file',
        {
            fileFilter,
            /*limits:{ fileSize: 5000},*/
            storage: diskStorage({
                destination: './static/products',
                filename: fileRename
            })
        }))
    uploadProduct(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('Something wrong with the File')
        }

        const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`

        return {secureUrl};
    }

}
