import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class AddForeignKeyRoleOnUser1649779705006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'User',
            new TableForeignKey({
                name: 'UserRole',
                columnNames: ['id_role'],
                referencedColumnNames: ['id'],
                referencedTableName: 'Role',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('User', 'UserRole')
    }
}
