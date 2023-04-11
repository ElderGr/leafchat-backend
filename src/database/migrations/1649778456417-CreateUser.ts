import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1649778456417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'User',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar(36)',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'id_role',
                        type: 'varchar(36)',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('User')
    }

}
