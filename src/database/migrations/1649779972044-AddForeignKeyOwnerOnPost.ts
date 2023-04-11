import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class AddForeignKeyOwnerOnPost1649779972044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'Post',
            new TableForeignKey({
                name: 'PostUser',
                columnNames: ['id_user'],
                referencedColumnNames: ['id'],
                referencedTableName: 'User',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Post', 'PostUser')
    }

}
