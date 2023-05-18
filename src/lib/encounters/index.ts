import type { Character } from '$lib/characters';

export interface Participant {
	character: Character;
	initiative: number;
	conditions: string[];
}
export interface Encounter {
	name: string;
	participants: Participant[];
}
