import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersCProfileIdNull1648214748776 implements MigrationInterface {
    name = 'UsersCProfileIdNull1648214748776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "userId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profileId" character varying`);
    }

}
