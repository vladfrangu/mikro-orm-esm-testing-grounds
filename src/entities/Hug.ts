import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Hug {
	@PrimaryKey()
	public id!: number;
}
