import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesUserCommentThread1742840774159 implements MigrationInterface {
    name = 'CreateTablesUserCommentThread1742840774159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`avatar\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`threads\` (\`parent_id\` int NOT NULL, \`child_id\` int NOT NULL, PRIMARY KEY (\`parent_id\`, \`child_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`movie_id\` int NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`threads\` ADD CONSTRAINT \`FK_60057dd3dbc28937a636a673b3d\` FOREIGN KEY (\`parent_id\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`threads\` ADD CONSTRAINT \`FK_9e991691795a2befd49eaa8adff\` FOREIGN KEY (\`child_id\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_6146d39292211165aab15a622d1\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_6146d39292211165aab15a622d1\``);
        await queryRunner.query(`ALTER TABLE \`threads\` DROP FOREIGN KEY \`FK_9e991691795a2befd49eaa8adff\``);
        await queryRunner.query(`ALTER TABLE \`threads\` DROP FOREIGN KEY \`FK_60057dd3dbc28937a636a673b3d\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`threads\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);  
    }

}
