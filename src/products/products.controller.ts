import {Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {PaginatorDto} from "../common/dtos/paginator.dto";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() paginatorDto: PaginatorDto) {
    return this.productsService.findAll(paginatorDto);
  }

  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string,
         @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }


  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
