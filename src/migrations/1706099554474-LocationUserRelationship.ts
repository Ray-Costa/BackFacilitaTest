import { MigrationInterface, QueryRunner } from "typeorm";

export class LocationUserRelationship1706099554474 implements MigrationInterface {
    name = 'LocationUserRelationship1706099554474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "x" integer NOT NULL, "y" integer NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "locationId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_49acb911ee20b02f86ec532a122" UNIQUE ("locationId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_49acb911ee20b02f86ec532a122" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_49acb911ee20b02f86ec532a122"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_49acb911ee20b02f86ec532a122"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "locationId"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
