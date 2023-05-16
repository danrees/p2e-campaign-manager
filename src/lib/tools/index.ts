export interface Participant {
	id: string;
	name: string;
	hitPoints: number;
	initiative: number;
	condition: string;
	acTotal: { acTotal: number };
}

export interface Encounter {
	id?: string;
	name: string;
	participants: Participant[];
}
