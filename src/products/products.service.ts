import {Injectable, NotAcceptableException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {DataSource, Repository} from "typeorm";
import {Product, ProductImage} from "./entities";
import {InjectRepository} from "@nestjs/typeorm";
import {ErrorHandleService} from "../common/services/error-handle/error-handle.service";
import {PaginatorDto} from "../common/dtos/paginator.dto";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>,
        private readonly errorHandler: ErrorHandleService,
        private readonly dataSource: DataSource
    ) {
    }

    async create(createProductDto: CreateProductDto) {
        const { images = [], ...createProductDtoRes } = createProductDto;

        try {
            const product = this.productRepository.create({
                ...createProductDtoRes,
                images: images.map((url: string) => this.productImageRepository.create({url}) )
            });
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
                relations: {
                    images: true
                }
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

        const {images, ...toUpdate} = updateProductDto;
        const product = await this.productRepository.preload({
            id,
            ...toUpdate,
        });

        if (!product) new NotAcceptableException(`Product with ID ${id} not found`);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if(images){
                await queryRunner.manager.delete(ProductImage,{product: {id}});
                product.images = images.map(url => this.productImageRepository.create({url}));
                await queryRunner.manager.save(product);
                await queryRunner.commitTransaction();
                await queryRunner.release();
                return product;
            }else{
                 await this.productRepository.save({...product,});
                 return this.findOne(id)
            }

        } catch (err) {
           await queryRunner.rollbackTransaction();
           await queryRunner.release();
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

    /****
     * this method needs to be exec before to run teh seed
     * */
     private async  deleteAllProducts() {
        const query  =  this.productRepository.createQueryBuilder('product');
        try {
            return await  query
                .delete()
                .where({})
                .execute();
        } catch (err) {
            this.errorHandler.errorHandle(err);
        }
    }


    async runSeedProducts(products: any[]) {
        try {
            await this.deleteAllProducts();
            const promiseGroup = [];

            products.forEach(product => {
                promiseGroup.push(this.create(product));
            });
            return await Promise.all(promiseGroup);
        } catch (err) {
            this.errorHandler.errorHandle(err);
        }
    }
}
