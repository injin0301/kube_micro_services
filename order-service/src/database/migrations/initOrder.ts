import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class initOrder implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "order_status_enum" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED');`);

        await queryRunner.createTable(
            new Table({
                name: "order",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "userId",
                        type: "uuid"
                    },
                    {
                        name: "productList",
                        type: "jsonb"
                    },
                    {
                        name: "totalPrice",
                        type: "int"
                    },
                    {
                        name: "status",
                        type: "order_status_enum",
                        default: `'PENDING'`
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order");
        await queryRunner.query(`DROP TYPE "order_status_enum"`);
    }

}
