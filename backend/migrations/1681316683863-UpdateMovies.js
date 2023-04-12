import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class UpdateMovies1681316683863 {
    name = 'UpdateMovies1681316683863'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "langue" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "mvid" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "UQ_28aef6a9abf3ea8ce3c2e446341" UNIQUE ("mvid")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "backdroprul" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "popularity" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "votes" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "vote_avg" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "adult" boolean
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "overview" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "titre_origin" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "comment" character varying NOT NULL DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ALTER COLUMN "date" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ALTER COLUMN "posterurl" DROP NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ALTER COLUMN "posterurl"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ALTER COLUMN "date"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "comment"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "titre_origin"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "overview"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "adult"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "vote_avg"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "votes"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "popularity"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "backdroprul"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "UQ_28aef6a9abf3ea8ce3c2e446341"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "mvid"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "langue"
        `);
    }
}
