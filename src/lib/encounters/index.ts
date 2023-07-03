import type { Character } from '$lib/characters';

export type Participant = {
	id: string;
	character: Character;
	initiative: number;
	currentHP: number;
	conditions: string[];
	remove: boolean;
};
export type Encounter = {
	name: string;
	id: string;
	participants: Participant[];
};
