export interface Details {
	name: string;
}

export type Participant = {
	id: string;
	details: Details;
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
