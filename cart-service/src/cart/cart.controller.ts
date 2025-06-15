import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Headers,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('')
  @ApiOperation({ summary: 'Créer un panier pour un utilisateur' })
  @ApiHeader({
    name: 'x-user-id',
    description: "ID de l'utilisateur (envoyé dans les headers)",
    required: true,
    schema: { type: 'string' },
  })
  @ApiBody({
    description: 'Données pour créer un panier',
    type: CreateCartDto,
  })
  @ApiResponse({ status: 201, description: 'Panier créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(
    @Headers('x-user-id') userId: string,
    @Body() createCartDto: CreateCartDto,
  ) {
    // Call the product service to check the availability of cart
    return this.cartService.create({
      ...createCartDto
    }, +userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un panier par son id' })
  @ApiHeader({
    name: 'x-user-id',
    description: "ID de l'utilisateur (envoyé dans les headers)",
    required: true,
    schema: { type: 'string' },
  })
  @ApiResponse({ status: 200, description: 'Panier trouvé.' })
  @ApiResponse({ status: 404, description: 'Panier non trouvé.' })
  findOne(@Headers('x-user-id') userId: string, @Param('id') id: string) {
    return this.cartService.findOne(+id, +userId);
  }

  @Patch('')
  @ApiOperation({ summary: 'Met à jour le panier de l\'utilisateur' })
  @ApiHeader({
    name: 'x-user-id',
    description: "ID de l'utilisateur (envoyé dans les headers)",
    required: true,
    schema: { type: 'string' },
  })
  @ApiBody({
    description: 'Données pour mettre à jour le panier',
    type: UpdateCartDto,
  })
  @ApiResponse({ status: 200, description: 'Panier mis à jour avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  update(
    @Headers('x-user-id') userId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.update(+userId, updateCartDto);
  }

  @Delete('')
  @ApiOperation({ summary: 'Supprime le panier de l\'utilisateur' })
  @ApiHeader({
    name: 'x-user-id',
    description: "ID de l'utilisateur (envoyé dans les headers)",
    required: true,
    schema: { type: 'string' },
  })
  @ApiResponse({ status: 200, description: 'Panier supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Panier non trouvé.' })
  remove(@Headers('x-user-id') userId: string) {
    return this.cartService.remove(+userId);
  }
}
