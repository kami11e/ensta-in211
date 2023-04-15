import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class UpdateUsers21681600153131 {
    name = 'UpdateUsers21681600153131'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "loginStatus" boolean NOT NULL DEFAULT false
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "loginStatus"
        `);
    }
}
