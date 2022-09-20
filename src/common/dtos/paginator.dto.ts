import {IsNumber, IsOptional, IsPositive} from "class-validator";
import {Type} from "class-transformer";


export class PaginatorDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(()=> Number)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(()=> Number)
    offset?:number;
}
