import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyTableUser1743622166208 implements MigrationInterface {
    name = 'ModifyTableUser1743622166208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`first_name\` \`first_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_name\` \`last_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_name\` \`last_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`first_name\` \`first_name\` varchar(255) NOT NULL`);
    }
}
