import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetProductDto } from './dto/get-product.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Produits') // Affiche "Produits" dans Swagger
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  // @Get("all")
  @ApiOperation({ summary: 'Récupérer tous les produits' })
  @ApiResponse({
    status: 200,
    description: 'Liste de tous les produits',
    type: GetProductDto,
    isArray: true,
  })
  async findAll(): Promise<GetProductDto[]> {
    const products = await this.productService.findAll();
    return products.map((p) => new GetProductDto(p));
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Récupérer un produit par ID' })
  @ApiParam({ name: 'id', description: 'Identifiant du produit' })
  @ApiResponse({
    status: 200,
    description: 'Détails du produit',
    type: GetProductDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Produit non trouvé',
  })
  async findOne(@Param('id') id: string): Promise<GetProductDto> {
    const p = await this.productService.findOne(id);
    return new GetProductDto(p);
  }
}