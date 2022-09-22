import { Injectable } from '@nestjs/common';
import {ProductsService} from "../products/products.service";
import {initialData} from "./data";

@Injectable()
export class SeedService {

  constructor(private readonly productsService: ProductsService){}

  async create() {
    return  await this.productsService.runSeedProducts(initialData.products)
  }




}
