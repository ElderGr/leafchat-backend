import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnFileInPostMidia1650156161364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
          'PostMidia',
          new TableColumn({
            name: 'file',
            type: 'varchar',
          })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('PostMidia', 'file')
    }

}
