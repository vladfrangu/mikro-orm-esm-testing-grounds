import { MikroORM } from '@mikro-orm/core';
import type { SqliteDriver } from '@mikro-orm/sqlite';
import { Hug } from './entities/Hug.js';

console.log({ imports: process.env.MIKRO_ORM_DYNAMIC_IMPORTS });

const orm = await MikroORM.init<SqliteDriver>({
	entities: ['./dist/entities'],
	dbName: 'owo.sqlite',
	type: 'sqlite',
	// baseDir: dirname(fileURLToPath(import.meta.url)),
});

await orm.getSchemaGenerator().ensureDatabase();
await orm.getSchemaGenerator().updateSchema({
	dropTables: true,
});

const hugOne = new Hug();
const hugTwo = new Hug();

await orm.em.fork().persistAndFlush([hugOne, hugTwo]);
const entities = await orm.em.fork().find(Hug, {});
console.log(entities);

await orm.em.fork().removeAndFlush(entities);
await orm.close();
