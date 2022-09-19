import {IsNumber, IsOptional, IsPositive} from "class-validator";


export class PaginatorDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    limit?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?:number;
}
