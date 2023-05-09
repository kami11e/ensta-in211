import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class UpdateUserAddRole1683673466261 {
    name = 'UpdateUserAddRole1683673466261'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "role" character varying NOT NULL DEFAULT 'user'
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "role"
        `);
    }
}
