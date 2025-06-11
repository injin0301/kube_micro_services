import { 
  Controller, Get, Post, Param, Body, Headers 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

const userHeader = 'x-user-id';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une commande manuellement' })
  @ApiHeader({ name: userHeader, description: 'ID de l’utilisateur' })
  @ApiResponse({ status: 201, description: 'Commande créée', type: Order })
  createManual(
    @Headers(userHeader) userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get('cart')
  @ApiOperation({ summary: 'Créer une commande à partir du panier' })
  @ApiHeader({ name: userHeader, description: 'ID de l’utilisateur' })
  @ApiResponse({ status: 201, description: 'Commande créée depuis le panier', type: Order })
  getOrderCart(
    @Headers(userHeader) userId: string,
  ): Promise<Order> {
    return this.orderService.getCart(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les commandes' })
  @ApiResponse({ status: 200, description: 'Liste des commandes', type: [Order] })
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une commande par ID' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Commande trouvée', type: Order })
  findOne(@Param('id') id: string): Promise<Order | null> {
    return this.orderService.findOne(id);
  }
}