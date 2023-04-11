import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddForeignKeyIdPostInPostMidia1650155237200 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
        'PostMidia',
        new TableForeignKey({
            name: 'PostMidiaToPost',
            columnNames: ['id_post'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Post',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('PostMidia', 'PostMidiaToPost')
  }
}
