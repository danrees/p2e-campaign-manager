import type { Character } from '$lib/characters';

export interface Participant {
	character: Character;
	initiative: number;
	currentHP: number;
	conditions: string[];
}
export interface Encounter {
	name: string;
	id: string;
	participants: Participant[];
}
