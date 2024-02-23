import type { HttpError } from '@sveltejs/kit';

type SpellIndex = {
	index: string;
	name: string;
	url: string;
};

/* {
	area_of_effect: 'optional',
	attack_type: 'optional',
	casting_time: 'required',
	classes: 'required',
	components: 'required',
	concentration: 'required',
	damage: 'optional',
	dc: 'optional',
	desc: 'required',
	duration: 'required',
	heal_at_slot_level: 'optional',
	higher_level: 'optional',
	index: 'required',
	level: 'required',
	material: 'optional',
	name: 'required',
	range: 'required',
	ritual: 'required',
	school: 'required',
	subclasses: 'required',
	url: 'required',
  } */

type SpellSchema = {
	area_of_effect?: AreaOfEffect | null;
	attack_type?: 'ranged' | 'melee';
	casting_time: string;
	classes: ClassIndexEntity[];
	components: Components[];
	concentration: boolean;
	damage?: Damage;
	dc: Dc;
	desc: string[];
	duration: string;
	heal_at_slot_level?: HealAtSlotLevel;
	higher_level?: string[];
	index: string;
	level: number;
	material?: string;
	name: string;
	range: string;
	ritual: boolean;
	school: SchoolIndexEntity;
	subclasses: SubclassesIndexEntity[];
	url: string;
};
//Abiltiy
type AbilityIndex = 'cha' | 'con' | 'dex' | 'int' | 'str' | 'wis';
type AbilityName = Uppercase<AbilityIndex>;
type AbilityIndexEntity = {
	index: AbilityIndex;
	name: AbilityName;
	url: `/api/ability-scores/${AbilityIndex}`;
};

// AoE
type AoEType = 'sphere' | 'cone' | 'cylinder' | 'line' | 'cube';
type AreaOfEffect = {
	type: AoEType;
	size: number;
};

// Classes
type ClassIndex =
	| 'wizard'
	| 'sorcerer'
	| 'cleric'
	| 'paladin'
	| 'ranger'
	| 'bard'
	| 'druid'
	| 'warlock';

type ClassIndexEntity = {
	index: ClassIndex;
	name: Capitalize<ClassIndex>;
	url: `/api/classes/${ClassIndex}`;
};
// Components
type Components = 'V' | 'S' | 'M';

// Damage
type Damage = {
	damage_type?: DamageIndexEntity;
	damage_at_slot_level?: DamageAtSlotLevel;
	damage_at_character_level?: DamageAtCharacterLevel;
};
type DamageIndex =
	| 'acid'
	| 'force'
	| 'bludgeoning'
	| 'slashing'
	| 'necrotic'
	| 'radiant'
	| 'fire'
	| 'lightning'
	| 'poison'
	| 'cold'
	| 'psychic'
	| 'piercing'
	| 'thunder';
type DamageIndexEntity = {
	index: DamageIndex;
	name: Capitalize<DamageIndex>;
	url: `/api/damage-types/${DamageIndex}`;
};
type DamageAtSlotLevel = {
	1?: string;
	2?: string;
	3?: string;
	4?: string;
	5?: string;
	6?: string;
	7?: string;
	8?: string;
	9?: string;
};
type DamageAtCharacterLevel = {
	1: string;
	5: string;
	11: string;
	17: string;
};
type HealAtSlotLevel = {
	2: '5';
	3: '10';
	4: '15';
	5: '20';
	6: '25';
	7: '30';
	8: '35';
	9: '40';
};

//DC
type Dc = {
	dc_type: AbilityIndexEntity;
	dc_success: string;
	desc?: string | null;
};

//School
type SchoolIndex =
	| 'evocation'
	| 'conjuration'
	| 'abjuration'
	| 'transmutation'
	| 'enchantment'
	| 'necromancy'
	| 'divination'
	| 'illusion';
type SchoolIndexEntity = {
	index: SchoolIndex;
	name: Capitalize<SchoolIndex>;
	url: `/api/magic-schools/${SchoolIndex}`;
};

//Subclasses
type SubclassesIndex = 'lore' | 'land' | 'life' | 'devotion' | 'fiend';
type SubclassesIndexEntity = {
	index: SubclassesIndex;
	name: Capitalize<SubclassesIndex>;
	url: `/api/subclasses/${SubclassesIndex}`;
};

type SpellResponse = {
	spell: SpellSchema;
	error: undefined | HttpError;
	isLoading: boolean;
};

export type {
	SpellIndex,
	SpellSchema,
	SpellResponse,
	ClassIndexEntity,
	AreaOfEffect,
	SubclassesIndexEntity
};
