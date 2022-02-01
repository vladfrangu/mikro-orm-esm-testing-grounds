import { MikroORM } from '@mikro-orm/core';
import type { SqliteDriver } from '@mikro-orm/sqlite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Hug } from './entities/Hug.js';

const orm = await MikroORM.init<SqliteDriver>({
	entities: ['./entities'],
	dbName: 'owo',
	type: 'sqlite',
	baseDir: dirname(fileURLToPath(import.meta.url)),
});

console.log(orm.em);

const hugOne = new Hug();
const hugTwo = new Hug();

console.log(await orm.em.persistAndFlush([hugOne, hugTwo]));
