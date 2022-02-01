import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Hug {
	@PrimaryKey()
	public id!: number;

	@Property({ type: 'MusicTitle', enum: true } as any)
	public musicTitle!: MusicTitle;
}

export enum MusicTitle {
	One = 1,
	Two,
	Seven = 7,
	Three = 3,
}
