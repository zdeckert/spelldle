import getDailySpell from '$lib/utils/getDailySpell.svelte.js';

export function load({}) {
	return {
		dailySpell: getDailySpell()
	};
}
