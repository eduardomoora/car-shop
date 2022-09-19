import {Injectable} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ErrorHandleService} from "../common/services/error-handle/error-handle.service";

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

    async findAll() {
        try {
            return await this.productRepository.find();
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

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    async remove(id: string) {
        try {
            return await this.productRepository.delete({id});
        } catch (err) {
            this.errorHandler.errorHandle(err);
        }
    }
}
