import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class CreateTables1681417572803 {
    name = 'CreateTables1681417572803'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer NOT NULL,
                "titre" character varying NOT NULL,
                "langue" character varying,
                "date" character varying,
                "posterurl" character varying,
                "backdroprul" character varying,
                "popularity" double precision NOT NULL,
                "votes" integer,
                "vote_avg" double precision,
                "adult" boolean,
                "overview" character varying,
                "titre_origin" character varying,
                "comment" character varying NOT NULL DEFAULT '',
                CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422" UNIQUE ("id"),
                CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "firstname" character varying NOT NULL,
                "lastname" character varying NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" SERIAL NOT NULL,
                "content" character varying,
                "userId" integer,
                "movieId" integer,
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"
        `);
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
