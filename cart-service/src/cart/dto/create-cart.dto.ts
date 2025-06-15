import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
    @ApiProperty({
    description: 'Liste des produits à ajouter au panier',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        productId: { type: 'number', example: 1, description: 'Identifiant du produit' },
        quantity: { type: 'number', example: 2, description: 'Quantité de ce produit' },
      },
    },
    example: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 },
    ],
  })
  products: {
    productId: number; // L'identifiant du produit
    quantity: number;   // La quantité de ce produit dans le panier
  }[];
}
