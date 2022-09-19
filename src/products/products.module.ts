import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {ErrorHandleService} from "../common/services/error-handle/error-handle.service";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ErrorHandleService],
  imports: [TypeOrmModule.forFeature([Product])]
})
export class ProductsModule {}
