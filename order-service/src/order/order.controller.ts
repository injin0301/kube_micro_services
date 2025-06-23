import { 
  Controller, Get, Post, Param, Body, Headers, 
  Delete
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import * as nats from 'nats';
import { ClientProxy, NatsRecordBuilder } from '@nestjs/microservices';

const userHeader = 'x-user-id';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService, private client: ClientProxy) {}

  @Get('cart/:id')
  @ApiOperation({ summary: 'Créer une commande à partir du panier' })
  @ApiHeader({
    name: userHeader,
    description: "ID de l'utilisateur (envoyé dans les headers)",
    required: true,
    schema: { type: 'string' },
  })
  @ApiParam({ name: 'id', description: 'ID du panier' })
  @ApiResponse({ status: 201, description: 'Commande créée depuis le panier', type: Order })
  @ApiResponse({ status: 404, description: 'Panier non trouvé' })
  getOrderCart(
    @Headers(userHeader) userId: string,
    @Param('id') id: string,
  ): Promise<Order> {
    return this.orderService.getCart(userId, id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Lister toutes les commandes' })
  @ApiHeader({
    name: userHeader,
    description: "ID de l'utilisateur (envoyé dans les headers)",
    required: true,
    schema: { type: 'string' },
  })
  @ApiResponse({ status: 200, description: 'Liste des commandes', type: [Order] })
  all(@Headers(userHeader) userId: string): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une commande par ID' })
  @ApiHeader({
    name: userHeader,
    description: "ID de l'utilisateur (envoyé dans les headers)",
    required: true,
    schema: { type: 'string' },
  })
  @ApiParam({ name: 'id', description: 'ID de la commande à supprimer' })
  @ApiResponse({ status: 204, description: 'Commande supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  deleteOrder(
    @Headers(userHeader) userId: string,
    @Param('id') id: string
  ): Promise<boolean> {
    return this.orderService.deleteOrder(id);
  }


  @Get('/test')
  @ApiOperation({ summary: 'Test endpoint' })
  @ApiResponse({ status: 200, description: 'Test réussi' })
  test(): string {
    const headers = nats.headers()
    headers.set('x-version', '1.0')

    const record = new NatsRecordBuilder(12).setHeaders(headers).build();    
    this.client.send('order.created', record)
    return 'oui'
  }
}
