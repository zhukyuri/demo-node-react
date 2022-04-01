import {MigrationInterface, QueryRunner} from "typeorm";

export class name1648828216494 implements MigrationInterface {
    name = 'name1648828216494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "username"`);
    }

}
