import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class UpdateUserTable1683671917302 {
    name = 'UpdateUserTable1683671917302'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "loginStatus" TO "salt"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"
        `);
        await queryRunner.query(`
            ALTER TABLE "my_list" DROP CONSTRAINT "FK_1897c03cf24264cb9b288c4a668"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422" UNIQUE ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "salt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "salt" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "my_list"
            ADD CONSTRAINT "FK_1897c03cf24264cb9b288c4a668" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "my_list" DROP CONSTRAINT "FK_1897c03cf24264cb9b288c4a668"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "salt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "salt" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422"
        `);
        await queryRunner.query(`
            ALTER TABLE "my_list"
            ADD CONSTRAINT "FK_1897c03cf24264cb9b288c4a668" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "salt" TO "loginStatus"
        `);
    }
}
