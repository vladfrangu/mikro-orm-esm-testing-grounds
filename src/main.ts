import { MikroORM } from '@mikro-orm/core';
import type { SqliteDriver } from '@mikro-orm/sqlite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Hug } from './entities/Hug.js';

console.log({ imports: process.env.MIKRO_ORM_DYNAMIC_IMPORTS });

const orm = await MikroORM.init<SqliteDriver>({
	entities: ['./entities'],
	dbName: 'owo.sqlite',
	type: 'sqlite',
	baseDir: dirname(fileURLToPath(import.meta.url)),
});

await orm.getSchemaGenerator().ensureDatabase();
await orm.getSchemaGenerator().updateSchema({
	dropTables: true,
});

console.log(orm.em);

const hugOne = new Hug();
const hugTwo = new Hug();

console.log(await orm.em.fork().persistAndFlush([hugOne, hugTwo]));

await orm.close();
