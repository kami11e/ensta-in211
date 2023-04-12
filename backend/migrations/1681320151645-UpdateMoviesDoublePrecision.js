import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class UpdateMoviesDoublePrecision1681320151645 {
    name = 'UpdateMoviesDoublePrecision1681320151645'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "popularity"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "popularity" double precision NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "vote_avg"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "vote_avg" double precision
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "vote_avg"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "vote_avg" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "popularity"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "popularity" integer NOT NULL
        `);
    }
}
