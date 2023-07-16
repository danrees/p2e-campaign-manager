export interface Attributes {
	ancestryhp: number;
	classhp: number;
	bonushp: number;
	bonushpPerLevel: number;
	speed: number;
	speedBonus: number;
}

export interface Abilities {
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
}

export interface Proficiencies {
	classDC: number;
	perception: number;
	fortitude: number;
	reflex: number;
	will: number;
	heavy: number;
	medium: number;
	light: number;
	unarmored: number;
	advanced: number;
	martial: number;
	simple: number;
	unarmed: number;
	castingArcane: number;
	castingDivine: number;
	castingOccult: number;
	castingPrimal: number;
	acrobatics: number;
	arcana: number;
	athletics: number;
	crafting: number;
	deception: number;
	diplomacy: number;
	intimidation: number;
	medicine: number;
	nature: number;
	occultism: number;
	performance: number;
	religion: number;
	society: number;
	stealth: number;
	survival: number;
	thievery: number;
}

export interface SpecificProficiencies {
	trained: string[];
	expert: string[];
	master: string[];
	legendary: string[];
}

export interface Weapon {
	name: string;
	qty: number;
	prof: string;
	die: string;
	pot: number;
	str: string;
	mat?: string;
	display: string;
	runes: string[];
}

export interface Money {
	pp: number;
	gp: number;
	sp: number;
	cp: number;
}

export interface Armor {
	name: string;
	qty: number;
	prof: string;
	pot: number;
	res: string;
	mat?: string;
	display: string;
	worn: boolean;
	runes: string[];
}

export interface AcTotal {
	acProfBonus: number;
	acAbilityBonus: number;
	acItemBonus: number;
	acTotal: number;
	shieldBonus: string;
}

export type Feat = [string, unknown] | [string, unknown, string, number];
export type Lore = [string, number];
export type Equipment = [string, number];

export type Character = {
	id: string;
	name: string;
	class: string;
	level: number;
	ancestry: string;
	heritage: string;
	background: string;
	alignment: string;
	gender: string;
	age: string;
	deity: string;
	size: number;
	keyability: string;
	languages: string[];
	attributes: Attributes;
	abilities: Abilities;
	proficiencies: Proficiencies;
	feats: Feat[];
	specials: string[];
	lores: Lore[];
	equipment: Equipment[];
	specificProficiencies: SpecificProficiencies;
	weapons: Weapon[];
	money: Money;
	armor: Armor[];
	spellCasters: SpellCaster[];
	formula: string[];
	pets: string[];
	acTotal: AcTotal;
};

export interface Build {
	success: boolean;
	build: Character;
}

export interface Spell {
	spellLevel: number;
	list: string[];
}

export interface SpellCaster {
	name: string;
	magicTradition: string;
	spellcastingType: string;
	ability: string;
	proficiency: number;
	focusPoints: number;
	spells: Spell[];
	perDay: number[];
}

export function abilityBonus(score: number): number {
	return Math.floor((score - 10) / 2);
}

export function calcHP(character: Character): number {
	const attr = character.attributes;
	const aBonus = abilityBonus(character.abilities.con);
	return (
		(attr.classhp + attr.bonushpPerLevel + aBonus) * character.level +
		attr.ancestryhp +
		attr.bonushp
	);
}

export function calcSpeed(ch: Character): number {
	const attr = ch.attributes;
	return attr.speedBonus + attr.speed;
}
