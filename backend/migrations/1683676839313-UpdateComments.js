import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class UpdateComments1683676839313 {
    name = 'UpdateComments1683676839313'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "rank" integer NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "rank"
        `);
    }
}
