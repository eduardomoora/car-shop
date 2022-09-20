import {Injectable, NotAcceptableException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ErrorHandleService} from "../common/services/error-handle/error-handle.service";
import {PaginatorDto} from "../common/dtos/paginator.dto";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly errorHandler: ErrorHandleService
    ) {
    }

    async create(createProductDto: CreateProductDto) {
        try {
            const product = this.productRepository.create(createProductDto);
            await this.productRepository.save(product);
            return product;
        } catch (err) {
            this.errorHandler.errorHandle(err);
        }
    }

    async findAll(paginatorDto: PaginatorDto) {
        const { limit = 10, offset = 0 } = paginatorDto;
        try {
            return await this.productRepository.find({
                take: limit,
                skip: offset,
                //TODO relations
            });
        } catch (err) {
            this.errorHandler.errorHandle(err);
        }
    }

   async findOne(id: string) {
        try {
            return await this.productRepository.findBy({id})
        } catch (err) {
            this.errorHandler.errorHandle(err);
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.productRepository.preload({
            id: id,
            ...updateProductDto
        });
        if (!product) new NotAcceptableException(`Product with ID ${id} not found`);
        try {
            await this.productRepository.save(product);
            return product;
        } catch (err) {
            this.errorHandler.errorHandle(err);
        }
    }

    async remove(id: string) {
        try {
            return await this.productRepository.delete({id});
        } catch (err) {
            this.errorHandler.errorHandle(err);
        }
    }
}
