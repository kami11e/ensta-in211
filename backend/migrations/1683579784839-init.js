import typeorm from 'typeorm';

const { MigrationInterface, QueryRunner } = typeorm;

export default class init1683579784839 {
  name = 'init1683579784839';

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer NOT NULL,
                "title" character varying NOT NULL,
                "original_language" character varying,
                "release_date" character varying,
                "poster_path" character varying,
                "backdrop_path" character varying,
                "popularity" double precision NOT NULL,
                "vote_count" integer,
                "vote_average" double precision,
                "adult" boolean,
                "overview" character varying,
                "original_title" character varying,
                "comment" character varying NOT NULL DEFAULT '',
                CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422" UNIQUE ("id"),
                CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "name" character varying NOT NULL DEFAULT 'momo',
                "firstname" character varying NOT NULL,
                "lastname" character varying NOT NULL,
                "password" character varying NOT NULL,
                "loginStatus" boolean NOT NULL DEFAULT false,
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
            CREATE TABLE "my_list" (
                "id" character varying NOT NULL,
                "userId" integer,
                "movieId" integer,
                CONSTRAINT "PK_50948b2442eaf0beff5f787ba99" PRIMARY KEY ("id")
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
    await queryRunner.query(`
            ALTER TABLE "my_list"
            ADD CONSTRAINT "FK_f4d7e1646bfa49f54bcfd673e10" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "my_list" DROP CONSTRAINT "FK_f4d7e1646bfa49f54bcfd673e10"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"
        `);
    await queryRunner.query(`
            DROP TABLE "my_list"
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
