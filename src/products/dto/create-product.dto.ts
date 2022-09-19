import {IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength} from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(2)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price: number

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    slug?: string;


    @IsOptional()
    @IsInt()
    @IsPositive()
    stock?:number;

    @IsString({each: true})
    @IsArray()
    sizes: string[];


    @IsString()
    @IsIn(['men','women','unisex','kid'])
    gender: string;




}