import { MikroORM } from '@mikro-orm/core';
import type { SqliteDriver } from '@mikro-orm/sqlite';
import { Hug, MusicTitle } from './entities/Hug.js';

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
hugOne.musicTitle = MusicTitle.One;
const hugTwo = new Hug();
hugTwo.musicTitle = MusicTitle.Two;

const hugInvalid = new Hug();
hugInvalid.musicTitle = 69;

await orm.em.fork().persistAndFlush([hugOne, hugTwo, hugInvalid]);
const entities = await orm.em.fork().find(Hug, {});
console.log(entities);

await orm.em.fork().removeAndFlush(entities);
await orm.close();
