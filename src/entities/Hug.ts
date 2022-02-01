import { Entity, Enum, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Hug {
	@PrimaryKey()
	public id!: number;

	@Enum({ type: 'MusicTitle' })
	public musicTitle!: MusicTitle;
}

export enum MusicTitle {
	One = 1,
	Two,
	Seven = 7,
	Three = 3,
}
