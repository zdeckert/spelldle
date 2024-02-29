import type { AreaOfEffect, ClassIndexEntity, SubclassesIndexEntity } from '$lib/types';

type BgValue =
	| 'bg-success text-success-content'
	| 'bg-warning text-warning-content'
	| 'bg-error text-error-content'
	| '';

// used for AoE
function getAoeBG(aoe1: AreaOfEffect | undefined, aoe2: AreaOfEffect | undefined): BgValue {
	// if (aoe1 === undefined || aoe2 == undefined) return '';
	if (aoe1?.type === aoe2?.type && aoe1?.size === aoe2?.size)
		return 'bg-success text-success-content';
	if (aoe1?.type === aoe2?.type || aoe1?.size === aoe2?.size)
		return 'bg-warning text-warning-content';
	return 'bg-error text-error-content';
}

// used for classes, components, subclasses
function getArrBG(arr1: string[] | [], arr2: string[] | []): BgValue {
	// if (arr1 === undefined || arr2 == undefined) return '';
	if (arr1.sort().toString() === arr2.sort().toString()) return 'bg-success text-success-content';

	let partial = false;

	arr1?.forEach((ele1) => {
		partial = arr2.includes(ele1);
	});

	return partial ? 'bg-warning text-warning-content' : 'bg-error text-error-content';
}

// used for attack type, casting time, damage, duration, range, school
function getStrBG(str1: string | undefined, str2: string | undefined): BgValue {
	// if (str1 === undefined || str2 == undefined) return '';
	return str1 === str2 ? 'bg-success text-success-content' : 'bg-error text-error-content';
}

//used for spell level
function getNumBG(num1: number | undefined, num2: number | undefined): BgValue {
	return num1 === num2 ? 'bg-success text-success-content' : 'bg-error text-error-content';
}

// used for concentration, ritual, higher level
function getBoolBG(bool1: boolean | undefined, boo2: boolean | undefined): BgValue {
	return bool1 === boo2 ? 'bg-success text-success-content' : 'bg-error text-error-content';
}

export { getAoeBG, getArrBG, getStrBG, getNumBG, getBoolBG };
