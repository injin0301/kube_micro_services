import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ReplaceMe1749906336538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create product table
    await queryRunner.createTable(
        new Table({
            name: 'cart',
            columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'userId',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'products',
                type: 'jsonb',
                isNullable: false
            },
            {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
            },
            {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
            },
            ],
        }),
        true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key first
        const table = await queryRunner.getTable('cart');

        if(!table) {
        throw new Error('Table "cart" does not exist');
        }

        await queryRunner.dropTable('cart');
    }

}
