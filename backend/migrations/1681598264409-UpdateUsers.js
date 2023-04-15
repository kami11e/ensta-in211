import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class UpdateUsers1681598264409 {
    name = 'UpdateUsers1681598264409'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422" UNIQUE ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);
    }
}
