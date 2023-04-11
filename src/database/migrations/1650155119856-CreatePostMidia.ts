import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePostMidia1650155119856 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: 'PostMidia',
            columns: [
                {
                    name: 'id',
                    type: 'varchar(36)',
                    isPrimary: true
                },
                {
                    name: 'id_post',
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
      await queryRunner.dropTable('PostMidia')
  }

}
