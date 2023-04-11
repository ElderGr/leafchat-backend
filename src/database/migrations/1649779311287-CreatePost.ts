import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePost1649779311287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Post',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar(36)',
                        isPrimary: true
                    },
                    {
                        name: 'message',
                        type: 'varchar',
                    },
                    {
                        name: 'id_user',
                        type: 'varchar(36)',
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
        await queryRunner.dropTable('Post')
    }

}
