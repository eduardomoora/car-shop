import {BadRequestException, Injectable, InternalServerErrorException, Logger, LoggerService} from '@nestjs/common';

@Injectable()
export class ErrorHandleService {
    private readonly logger = new Logger('ErrorHandleService');
    constructor(){

    }
    public errorHandle(error: any){
        if(error.code === '23505')
            throw new BadRequestException(error.detail);
        this.logger.error(error);
        throw new InternalServerErrorException('Unexpected Error');
    }
}
